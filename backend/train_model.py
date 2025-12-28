import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Dummy training data (for demo + viva)
data = {
    "lat": [28.6, 28.7, 19.0, 12.9, 22.5, 26.9],
    "lon": [77.2, 77.1, 72.8, 80.2, 88.3, 75.8],
    "severity": [3, 2, 3, 1, 2, 3],
    "hour": [9, 18, 22, 14, 8, 20],
    "risk": [2, 1, 2, 0, 1, 2]
}

df = pd.DataFrame(data)

X = df[["lat", "lon", "severity", "hour"]]
y = df["risk"]

model = RandomForestClassifier(n_estimators=100)
model.fit(X, y)

joblib.dump(model, "accident_model.pkl")

print("ML model trained & saved")
