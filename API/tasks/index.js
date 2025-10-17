let tasks = [
    { id: 1, title: "Learn Azure" },
    { id: 2, title: "Build CI/CD Pipeline" }
];

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // Enable CORS
    context.res = {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    };

    // Handle OPTIONS for CORS preflight
    if (req.method === "OPTIONS") {
        context.res.status = 200;
        return;
    }

    if (req.method === "GET") {
        context.res.body = tasks;
    }
    else if (req.method === "POST") {
        const newTask = {
            id: tasks.length + 1,
            title: req.body && req.body.title
        };
        tasks.push(newTask);
        context.res.status = 201;
        context.res.body = newTask;
    }
    else if (req.method === "DELETE") {
        const taskId = parseInt(context.bindingData.id);
        tasks = tasks.filter(task => task.id !== taskId);
        context.res.body = { success: true };
    }
    else {
        context.res.status = 405;
        context.res.body = "Method not allowed";
    }
};