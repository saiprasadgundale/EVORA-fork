import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
from pathlib import Path

def train_profit_model(df: pd.DataFrame):
    features = [
        "Quantity",
        "Revenue",
        "Expense",
        "Profit_Margin",
        "Revenue_per_Unit",
        "Expense_per_Unit"
    ]

    X = df[features]
    y = df["Profit"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42
    )

    model = RandomForestRegressor(
        n_estimators=100,
        random_state=42
    )

    model.fit(X_train, y_train)
    
    model_path = Path(__file__).parent / "profit_model.pkl"
    joblib.dump(model, model_path)

    predictions = model.predict(X_test)

    return model, predictions