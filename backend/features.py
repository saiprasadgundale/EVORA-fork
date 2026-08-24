import pandas as pd


def prepare_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # Profit
    df["Profit"] = df["Revenue"] - df["Expense"]

    # Profit Margin
    df["Profit_Margin"] = (
        (df["Profit"] / df["Revenue"].replace(0, pd.NA)) * 100
    )

    # Revenue per Unit
    df["Revenue_per_Unit"] = (
        df["Revenue"] / df["Quantity"].replace(0, pd.NA)
    )

    # Expense per Unit
    df["Expense_per_Unit"] = (
        df["Expense"] / df["Quantity"].replace(0, pd.NA)
    )

    # Replace invalid values
    df = df.replace(
        [float("inf"), float("-inf")],
        pd.NA
    )

    df = df.fillna(0)

    return df