const API_BASE_URL = '/api';

// Debug function to test API
async function testAPI() {
    console.log('Testing API connection...');
    
    try {
        // Test 1: Direct API call
        console.log('Test 1: Calling /api/tasks');
        const response = await fetch(`${API_BASE_URL}/tasks`);
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (response.ok) {
            const tasks = await response.json();
            console.log('Tasks from API:', tasks);
        } else {
            console.log('API returned error status:', response.status);
        }
        
        // Test 2: Try to add a task
        console.log('Test 2: Adding a task');
        const addResponse = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'Test Task' })
        });
        console.log('Add response status:', addResponse.status);
        
    } catch (error) {
        console.error('API Test Failed:', error);
    }
}

// Load tasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, testing API...');
    testAPI();
    fetchTasks();
});

async function fetchTasks() {
    try {
        console.log('Fetching tasks...');
        const response = await fetch(`${API_BASE_URL}/tasks`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const tasks = await response.json();
        console.log('Tasks loaded:', tasks);
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        // Fallback to demo data
        displayTasks([
            { id: 1, title: "Learn Azure" },
            { id: 2, title: "Build CI/CD Pipeline" }
        ]);
    }
}

function displayTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li>No tasks yet. Add one above!</li>';
        return;
    }
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.title}
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();

    if (title === '') {
        alert('Please enter a task title');
        return;
    }

    try {
        console.log('Adding task:', title);
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: title })
        });
        
        console.log('Add task response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newTask = await response.json();
        console.log('Task added successfully:', newTask);
        
        taskInput.value = '';
        await fetchTasks();
        
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Error adding task. Check console for details.');
    }
}

async function deleteTask(taskId) {
    try {
        console.log('Deleting task:', taskId);
        const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        console.log('Delete response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        await fetchTasks();
        
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Check console for details.');
    }
}