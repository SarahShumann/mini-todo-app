const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [];
let currentId = 1;

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.json({ token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = { id: currentId++, text: req.body.text };
    todos.push(todo);
    res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = req.body.text;
        res.json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.status(204).send();
});

module.exports = app;
