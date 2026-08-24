import pandas as pd
import sys
from pathlib import Path

# backend folder import path मध्ये add कर
sys.path.append(str(Path(__file__).parent.parent / "backend"))

from features import prepare_features
from model import train_profit_model


# Sample business data
df = pd.read_csv(
    Path(__file__).parent.parent / "data" / "sample_business_data.csv"
)

# Feature engineering
df = prepare_features(df)

print("Prepared features:")
print(df.head())

# ML model
model, predictions = train_profit_model(df)

print("\nModel trained successfully.")
print("Predictions:")
print(predictions)