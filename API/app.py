from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, crucial for frontend-backend communication

# In-memory "database" for initial development
tasks = [
    {"id": 1, "title": "Learn Azure"},
    {"id": 2, "title": "Build CI/CD Pipeline"}
]

# Get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Add a new task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    if not request.json or not 'title' in request.json:
        abort(400)  # Bad request
    new_task = {
        'id': tasks[-1]['id'] + 1 if tasks else 1,
        'title': request.json['title']
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

# Delete a task
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)