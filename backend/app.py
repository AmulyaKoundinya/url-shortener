# Redis-powered URL shortener backend
from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import random
import string
from datetime import datetime
import redis

app = Flask(__name__)
CORS(app)

# Redis connection (Docker container name = redis)
r = redis.Redis(
    host='redis',
    port=6379,
    decode_responses=True
)

def generate_code(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

@app.route('/api/shorten', methods=['POST'])
def shorten():

    data = request.json

    original_url = data.get("url")

    if not original_url:
        return jsonify({"error": "URL is required"}), 400

    # Check if URL already exists
    keys = r.keys('*')

    for key in keys:

        existing = r.hgetall(key)

        if existing.get("url") == original_url:

            return jsonify({
                "short_url": f"http://localhost/{key}",
                "code": key,
                "message": "Existing URL returned"
            })

    # Create new short code
    code = generate_code()

    while r.exists(code):
        code = generate_code()

    r.hset(code, mapping={
        "url": original_url,
        "clicks": 0,
        "created": datetime.now().strftime("%Y-%m-%d %H:%M")
    })

    return jsonify({
        "short_url": f"http://localhost/{code}",
        "code": code,
        "message": "New short URL created"
    })

@app.route('/<code>')
def redirect_url(code):

    if not r.exists(code):
        return "URL not found", 404

    data = r.hgetall(code)

    clicks = int(data["clicks"]) + 1

    r.hset(code, "clicks", clicks)

    return redirect(data["url"])

@app.route('/api/all')
def get_all_urls():

    keys = r.keys('*')

    result = []

    for key in keys:

        data = r.hgetall(key)

        result.append({
            "code": key,
            "url": data["url"],
            "clicks": int(data["clicks"]),
            "created": data["created"]
        })

    result.sort(
        key=lambda x: x["clicks"],
        reverse=True
    )

    return jsonify(result)

@app.route('/api/stats')
def stats():

    keys = r.keys('*')

    total_links = len(keys)

    total_clicks = 0
    top_clicks = 0

    today = datetime.now().strftime("%Y-%m-%d")

    created_today = 0

    for key in keys:

        data = r.hgetall(key)

        clicks = int(data["clicks"])

        total_clicks += clicks

        if clicks > top_clicks:
            top_clicks = clicks

        if data["created"].startswith(today):
            created_today += 1

    return jsonify({
        "total_links": total_links,
        "total_clicks": total_clicks,
        "top_clicks": top_clicks,
        "created_today": created_today
    })

@app.route('/api/delete/<code>', methods=['DELETE'])
def delete_url(code):

    r.delete(code)

    return jsonify({
        "message": "Deleted"
    })

@app.route('/api/clear', methods=['DELETE'])
def clear_all():

    keys = r.keys('*')

    for key in keys:
        r.delete(key)

    return jsonify({
        "message": "All cleared"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)