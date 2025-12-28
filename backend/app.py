from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import datetime
import os

app = Flask(__name__)
CORS(app)

def connect_db():
    return sqlite3.connect("database.db")

@app.route("/report", methods=["POST"])
def report_incident():
    data = request.json
    conn = connect_db()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO incidents
        (type, latitude, longitude, severity, timestamp)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data["type"],
        data["lat"],
        data["lon"],
        data["severity"],
        datetime.datetime.now()
    ))

    conn.commit()
    conn.close()
    return jsonify({"status": "Incident Recorded"})

@app.route("/incidents", methods=["GET"])
def get_incidents():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute("SELECT * FROM incidents")
    rows = cur.fetchall()
    conn.close()

    incidents = []
    for r in rows:
        incidents.append({
            "id": r[0],
            "type": r[1],
            "lat": r[2],
            "lon": r[3],
            "severity": r[4],
            "time": r[5]
        })
    return jsonify(incidents)

@app.route("/emergency-alert", methods=["POST"])
def emergency_alert():
    return jsonify({
        "alert": "Emergency services notified!",
        "priority": "HIGH"
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
