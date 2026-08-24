from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from features import prepare_features
import joblib
import pandas as pd
import sys
from pathlib import Path
import io

# ============================================================
# EVORA ROOT DIRECTORY
# ============================================================

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT_DIR))


# ============================================================
# IMPORT FEATURE ENGINEERING
# ============================================================

from backend.features import prepare_features


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="EVORA API",
    description="AI Business Intelligence & Decision Optimization System",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

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


# ============================================================
# LOAD ML MODEL
# ============================================================

MODEL_PATH = ROOT_DIR / "ml" / "profit_model.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Profit ML model loaded successfully.")
except Exception as e:
    model = None
    print(f"⚠️ Warning: Could not load ML model: {e}")


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "EVORA Backend is running successfully.",
        "status": "online"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "EVORA Backend"
    }


# ============================================================
# CSV UPLOAD ENDPOINT
# ============================================================

@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):

    # Check file type
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

        # ----------------------------------------------------
        # Read uploaded CSV
        # ----------------------------------------------------

        contents = await file.read()

        df = pd.read_csv(io.BytesIO(contents))

        # ----------------------------------------------------
        # Check empty CSV
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Normalize column names
        # ----------------------------------------------------

        df.columns = [
            str(col).strip()
            for col in df.columns
        ]

        # ----------------------------------------------------
        # Find required columns
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Convert numeric columns
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Remove invalid rows
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Calculate Profit
        # ----------------------------------------------------

        df["Profit"] = (
            df["Revenue"] - df["Expense"]
        )

        # ----------------------------------------------------
        # Calculate Business Metrics
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Average values
        # ----------------------------------------------------

        average_revenue = float(
            df["Revenue"].mean()
        )

        average_expense = float(
            df["Expense"].mean()
        )

        average_profit = float(
            df["Profit"].mean()
        )

        # ----------------------------------------------------
        # Profit Margin
        # ----------------------------------------------------

        if total_revenue != 0:

            profit_margin = (
                total_profit /
                total_revenue
            ) * 100

        else:

            profit_margin = 0.0

        # ----------------------------------------------------
        # Prepare ML Features
        # ----------------------------------------------------

        feature_df = prepare_features(
            df[
                [
                    "Quantity",
                    "Revenue",
                    "Expense"
                ]
            ].copy()
        )

        # ----------------------------------------------------
        # ML Prediction
        # ----------------------------------------------------

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

            # Check features
            missing_features = [
                feature
                for feature in features
                if feature not in feature_df.columns
            ]

            if not missing_features:

                prediction = model.predict(
                    feature_df[features]
                )

                # Average prediction across uploaded rows
                predicted_profit = float(
                    prediction.mean()
                )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

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


# ============================================================
# PROFIT PREDICTION REQUEST MODEL
# ============================================================

class ProfitPredictionRequest(BaseModel):

    Quantity: float

    Revenue: float

    Expense: float


# ============================================================
# ML PROFIT PREDICTION ENDPOINT
# ============================================================

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

        # ----------------------------------------------------
        # Create DataFrame
        # ----------------------------------------------------

        df = pd.DataFrame([
            {
                "Quantity": data.Quantity,
                "Revenue": data.Revenue,
                "Expense": data.Expense
            }
        ])

        # ----------------------------------------------------
        # Create required features
        # ----------------------------------------------------

        df = prepare_features(df)

        # ----------------------------------------------------
        # Features used by ML model
        # ----------------------------------------------------

        features = [
            "Quantity",
            "Revenue",
            "Expense",
            "Profit_Margin",
            "Revenue_per_Unit",
            "Expense_per_Unit"
        ]

        # ----------------------------------------------------
        # Check features
        # ----------------------------------------------------

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

        # ----------------------------------------------------
        # Predict Profit
        # ----------------------------------------------------

        prediction = model.predict(
            df[features]
        )

        predicted_profit = float(
            prediction[0]
        )

        # ----------------------------------------------------
        # Return prediction
        # ----------------------------------------------------

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