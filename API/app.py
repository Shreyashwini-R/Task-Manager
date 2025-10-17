from flask import Flask, jsonify, request
import os

app = Flask(__name__)

# Enable CORS for all routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

# Simple in-memory storage
tasks = [
    {"id": 1, "title": "Learn Azure"},
    {"id": 2, "title": "Build CI/CD Pipeline"}
]

@app.route('/api/tasks', methods=['GET', 'OPTIONS'])
def get_tasks():
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST', 'OPTIONS'])
def add_task():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        if not data or not data.get('title'):
            return jsonify({"error": "Title is required"}), 400
            
        new_task = {
            "id": len(tasks) + 1,
            "title": data['title']
        }
        tasks.append(new_task)
        return jsonify(new_task), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/tasks/<int:task_id>', methods=['DELETE', 'OPTIONS'])
def delete_task(task_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"success": True})

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "API is working!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)