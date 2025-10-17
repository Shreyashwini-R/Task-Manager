module.exports = async function (context, req) {
    let tasks = [
        { id: 1, title: "Learn Azure" },
        { id: 2, title: "Build CI/CD Pipeline" }
    ];

    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    // GET - Return all tasks
    if (req.method === 'GET') {
        context.res.body = tasks;
    }
    // POST - Add new task  
    else if (req.method === 'POST') {
        const newTask = {
            id: tasks.length + 1,
            title: req.body.title
        };
        tasks.push(newTask);
        context.res.body = newTask;
        context.res.status = 201;
    }
    // DELETE - Remove task
    else if (req.method === 'DELETE') {
        const taskId = parseInt(req.params.id);
        tasks = tasks.filter(task => task.id !== taskId);
        context.res.body = { success: true };
    }
    // Method not allowed
    else {
        context.res.status = 405;
        context.res.body = { error: 'Method not allowed' };
    }
};