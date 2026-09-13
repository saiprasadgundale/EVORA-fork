from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from features import prepare_features
import joblib
import pandas as pd
import sys
from pathlib import Path
import io

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT_DIR))

from backend.features import prepare_features

app = FastAPI(
    title="EVORA API",
    description="AI Business Intelligence & Decision Optimization System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = ROOT_DIR / "ml" / "profit_model.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Profit ML model loaded successfully.")
except Exception as e:
    model = None
    print(f"⚠️ Warning: Could not load ML model: {e}")


@app.get("/")
def root():
    return {
        "message": "EVORA Backend is running successfully.",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "EVORA Backend"
    }


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected."
        )

    if not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file."
        )

    try:

        contents = await file.read()

        df = pd.read_csv(io.BytesIO(contents))

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="The uploaded CSV file is empty."
            )

        print("\n========================================")
        print("CSV RECEIVED")
        print("========================================")
        print("Filename:", file.filename)
        print("Rows:", len(df))
        print("Columns:", list(df.columns))

        df.columns = [
            str(col).strip()
            for col in df.columns
        ]

        required_columns = [
            "Quantity",
            "Revenue",
            "Expense"
        ]

        missing_columns = [
            col
            for col in required_columns
            if col not in df.columns
        ]

        if missing_columns:

            raise HTTPException(
                status_code=400,
                detail={
                    "message": "Required columns are missing from CSV.",
                    "missing_columns": missing_columns,
                    "required_columns": required_columns,
                    "available_columns": list(df.columns)
                }
            )

        df["Quantity"] = pd.to_numeric(
            df["Quantity"],
            errors="coerce"
        )

        df["Revenue"] = pd.to_numeric(
            df["Revenue"],
            errors="coerce"
        )

        df["Expense"] = pd.to_numeric(
            df["Expense"],
            errors="coerce"
        )

        df = df.dropna(
            subset=[
                "Quantity",
                "Revenue",
                "Expense"
            ]
        )

        if df.empty:
            raise HTTPException(
                status_code=400,
                detail="No valid numeric data found in Quantity, Revenue and Expense columns."
            )

        df["Profit"] = (
            df["Revenue"] - df["Expense"]
        )

        total_revenue = float(
            df["Revenue"].sum()
        )

        total_expense = float(
            df["Expense"].sum()
        )

        total_profit = float(
            df["Profit"].sum()
        )

        total_sales = float(
            df["Quantity"].sum()
        )

        average_revenue = float(
            df["Revenue"].mean()
        )

        average_expense = float(
            df["Expense"].mean()
        )

        average_profit = float(
            df["Profit"].mean()
        )

        if total_revenue != 0:

            profit_margin = (
                total_profit /
                total_revenue
            ) * 100

        else:

            profit_margin = 0.0

        feature_df = prepare_features(
            df[
                [
                    "Quantity",
                    "Revenue",
                    "Expense"
                ]
            ].copy()
        )

        predicted_profit = None

        if model is not None:

            features = [
                "Quantity",
                "Revenue",
                "Expense",
                "Profit_Margin",
                "Revenue_per_Unit",
                "Expense_per_Unit"
            ]

            missing_features = [
                feature
                for feature in features
                if feature not in feature_df.columns
            ]

            if not missing_features:

                prediction = model.predict(
                    feature_df[features]
                )

                predicted_profit = float(
                    prediction.mean()
                )

        return {
            "success": True,

            "message": "CSV processed successfully.",

            "filename": file.filename,

            "rows_processed": int(len(df)),

            "metrics": {

                "total_revenue": total_revenue,

                "total_expense": total_expense,

                "total_profit": total_profit,

                "total_sales": total_sales,

                "average_revenue": average_revenue,

                "average_expense": average_expense,

                "average_profit": average_profit,

                "profit_margin": profit_margin
            },

            "predicted_profit": predicted_profit
        }

    except HTTPException:
        raise

    except Exception as e:

        print("\n❌ CSV processing error:")
        print(str(e))

        raise HTTPException(
            status_code=500,
            detail={
                "message": "Failed to process CSV file.",
                "error": str(e)
            }
        )


class ProfitPredictionRequest(BaseModel):

    Quantity: float

    Revenue: float

    Expense: float


@app.post("/ml/predict-profit")
def predict_profit(
    data: ProfitPredictionRequest
):

    if model is None:

        raise HTTPException(
            status_code=500,
            detail="ML model could not be loaded."
        )

    try:

        df = pd.DataFrame([
            {
                "Quantity": data.Quantity,
                "Revenue": data.Revenue,
                "Expense": data.Expense
            }
        ])

        df = prepare_features(df)

        features = [
            "Quantity",
            "Revenue",
            "Expense",
            "Profit_Margin",
            "Revenue_per_Unit",
            "Expense_per_Unit"
        ]

        missing_features = [
            feature
            for feature in features
            if feature not in df.columns
        ]

        if missing_features:

            raise HTTPException(
                status_code=500,
                detail={
                    "message": "Required ML features are missing.",
                    "missing_features": missing_features
                }
            )

        prediction = model.predict(
            df[features]
        )

        predicted_profit = float(
            prediction[0]
        )

        return {
            "success": True,
            "predicted_profit": predicted_profit
        }

    except HTTPException:
        raise

    except Exception as e:

        print("\n❌ ML prediction error:")
        print(str(e))

        raise HTTPException(
            status_code=500,
            detail={
                "message": "Profit prediction failed.",
                "error": str(e)
            }
        )