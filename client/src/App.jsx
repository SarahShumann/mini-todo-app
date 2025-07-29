import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const [editText, setEditText] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:4000/login', loginData);
      setToken(res.data.token);
    } catch {
      alert('Invalid credentials');
    }
  };

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:4000/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await axios.post('http://localhost:4000/todos', { text: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    await axios.put(`http://localhost:4000/todos/${id}`, { text: editText });
    setEditTodoId(null);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        {!token ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button
              onClick={login}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Todos</h2>
            <div className="flex mb-4">
              <input
                placeholder="New Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-l"
              />
              <button
                onClick={addTodo}
                className="bg-indigo-600 text-white px-4 rounded-r hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded shadow"
                >
                  {editTodoId === todo.id ? (
                    <>
                      <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded mr-2"
                      />
                      <button
                        onClick={() => updateTodo(todo.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mr-1"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => setEditTodoId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-grow text-gray-700">{todo.text}</span>
                      <button
                        onClick={() => {
                          setEditTodoId(todo.id);
                          setEditText(todo.text);
                        }}
                        className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
