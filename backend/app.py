"""
NexFero Innovations - Python Flask Backend with SQLite
"Beyond Ideas. Beyond Limits."
"""

import os
import sqlite3
import random
import string
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder="../", static_url_path="")

DB_PATH = os.path.join(os.path.dirname(__file__), "contacts.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tracking_id TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            service TEXT,
            budget TEXT,
            message TEXT NOT NULL,
            ip_address TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

def generate_tracking_id():
    chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
    suffix = "".join(random.choice(chars) for _ in range(5))
    return f"NXF-{suffix}"

@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "backend": "Python Flask",
        "database": "SQLite",
        "company": "NexFero Innovations",
        "timestamp": datetime.utcnow().isoformat()
    })

@app.route("/api/contact", methods=["POST", "OPTIONS"])
def submit_contact():
    if request.method == "OPTIONS":
        return "", 204

    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    phone = (data.get("phone") or "").strip()
    service = data.get("service") or "General Inquiry"
    budget = data.get("budget") or "Flexible"
    message = (data.get("message") or "").strip()
    tracking_id = data.get("trackingId") or generate_tracking_id()

    if not name or not email or not message:
        return jsonify({
            "status": "error",
            "message": "Validation error: Name, email, and message are required."
        }), 400

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO inquiries (tracking_id, name, email, phone, service, budget, message, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (tracking_id, name, email, phone, service, budget, message, request.remote_addr))
        conn.commit()
        conn.close()

        return jsonify({
            "status": "success",
            "trackingId": tracking_id,
            "message": f"Inquiry registered successfully in NexFero database. Reference: {tracking_id}"
        }), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("SELECT tracking_id, name, email, phone, service, budget, message, created_at FROM inquiries ORDER BY id DESC")
        rows = cursor.fetchall()
        conn.close()

        contacts = [
            {
                "trackingId": row["tracking_id"],
                "name": row["name"],
                "email": row["email"],
                "phone": row["phone"],
                "service": row["service"],
                "budget": row["budget"],
                "message": row["message"],
                "timestamp": row["created_at"]
            }
            for row in rows
        ]
        return jsonify({"status": "success", "count": len(contacts), "contacts": contacts})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Serve static frontend
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "404.html"), 404

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"NexFero Flask Server starting on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)

