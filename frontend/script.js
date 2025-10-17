// Simple task manager that works without API
let tasks = [
    { id: 1, title: "Learn Azure" },
    { id: 2, title: "Build CI/CD Pipeline" }
];

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Task Manager Loaded!');
    displayTasks();
});

function displayTasks() {
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

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const title = taskInput.value.trim();

    if (title === '') {
        alert('Please enter a task title');
        return;
    }

    // Add new task
    const newTask = {
        id: tasks.length + 1,
        title: title
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    displayTasks();
    
    // Show success
    alert('Task added successfully!');
}

function deleteTask(taskId) {
    if (confirm('Delete this task?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        displayTasks();
    }
}