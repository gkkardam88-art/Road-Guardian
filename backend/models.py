import sqlite3

conn = sqlite3.connect("database.db")
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    latitude REAL,
    longitude REAL,
    severity TEXT,
    timestamp TEXT
)
""")

conn.commit()
conn.close()

print("Database Ready")
