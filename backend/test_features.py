import pandas as pd 
from features import prepare_features

df = pd.DataFrame({
    "Quantity": [100,200],
    "Revenue":[10000,30000],
    "Expense":[7000,18000]
})

result = prepare_features(df)
print(result.to_string(index=False))