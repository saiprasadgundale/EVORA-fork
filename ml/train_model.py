import sys
from pathlib import Path

import joblib
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Project paths
ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "backend"
DATA_PATH = ROOT_DIR / "data" / "sample_business_data.csv"
MODEL_PATH = ROOT_DIR / "ml" / "profit_model.pkl"

# Import feature engineering
sys.path.append(str(BACKEND_DIR))
from features import prepare_features


# Load dataset
df = pd.read_csv(DATA_PATH)

# Prepare features
df = prepare_features(df)

# Features used by model
features = [
    "Quantity",
    "Revenue",
    "Expense",
    "Profit_Margin",
    "Revenue_per_Unit",
    "Expense_per_Unit",
]

X = df[features]
y = df["Profit"]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Create model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# Save model
joblib.dump(model, MODEL_PATH)

print("✅ Profit model trained successfully.")
print(f"✅ Model saved to: {MODEL_PATH}")