const API_BASE_URL = '/api';

async function fetchTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        // Fallback to mock data for demo
        displayTasks([
            { id: 1, title: "Learn Azure" },
            { id: 2, title: "Build CI/CD Pipeline" }
        ]);
    }
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();

    if (title === '') return;

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title })
        });
        
        if (response.ok) {
            taskInput.value = '';
            fetchTasks();
        }
    } catch (error) {
        console.error('Error adding task:', error);
        // For demo purposes, add to local array
        fetchTasks();
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        // For demo purposes, refresh the list
        fetchTasks();
    }
}