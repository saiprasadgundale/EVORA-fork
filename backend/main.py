from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO

app = FastAPI(title="EVORA API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "status": "success",
        "message": "EVORA backend is running"
    }


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    # Check file type
    if not file.filename.endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Please upload a CSV file."
        )

    # Read uploaded file
    contents = await file.read()

    try:
        df = pd.read_csv(BytesIO(contents))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read CSV file."
        )

    # Check empty dataset
    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="CSV file is empty."
        )

    # Basic data validation
    missing_values = int(df.isnull().sum().sum())
    duplicate_rows = int(df.duplicated().sum())

    # Check required columns
    required_columns = [
        "Date",
        "Product",
        "Quantity",
        "Revenue",
        "Expense",
        "Customer"
    ]

    missing_columns = [
        column for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Required columns are missing.",
                "missing_columns": missing_columns
            }
        )

    # Business metrics
    total_revenue = float(df["Revenue"].sum())
    total_expense = float(df["Expense"].sum())
    total_profit = total_revenue - total_expense
    total_sales = int(df["Quantity"].sum())

    return {
        "status": "success",
        "message": "CSV processed successfully.",
        "file_name": file.filename,
        "rows": len(df),
        "columns": list(df.columns),
        "data_validation": {
            "missing_values": missing_values,
            "duplicate_rows": duplicate_rows
        },
        "metrics": {
            "total_revenue": total_revenue,
            "total_expense": total_expense,
            "total_profit": total_profit,
            "total_sales": total_sales
        }
    }