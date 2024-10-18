// src/components/Tasks.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { ref, onValue, push, update } from 'firebase/database';
import './Tasks.css';

const AddTodo = ({ newTodo, handleInputChange, handleAddTodo }) => {
  return (
    <div className="add-todo-section">
      <h3>Add New Todo</h3>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          name="title"
          placeholder="Todo title"
          value={newTodo.title}
          onChange={handleInputChange}
          required
        />
        <select name="priority" value={newTodo.priority} onChange={handleInputChange}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select name="status" value={newTodo.status} onChange={handleInputChange}>
          <option value="pending">Pending</option>
          <option value="complete">Complete</option>
        </select>
        <button type="submit" className="add-todo-btn">Add Todo</button>
      </form>
    </div>
  );
};

const TodoList = ({ todos }) => {
  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'red';
    if (priority === 'medium') return 'yellow';
    return 'green';
  };

  return (
    <div className="todo-list-section">
      <h2>Your Todos</h2>
      <ul>
        {todos.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          todos.map((todo, index) => (
            <li key={index} className="todo-item" style={{ borderLeftColor: getPriorityColor(todo.priority) }}>
              <h4>{todo.title}</h4>
              <p style={{ color: getPriorityColor(todo.priority) }}>Priority: {todo.priority}</p>
              <p>Status: {todo.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const Tasks = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    priority: 'medium',
    status: 'pending',
  });

  // Check if user is logged in (persist session)
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    const userTodosRef = ref(db, `users/${userId}/todos`);
    onValue(userTodosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const todosArray = Object.values(data);
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewTodo({
      ...newTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not authenticated');
      return;
    }

    const userTodosRef = ref(db, `users/${userId}/todos`);
    const newTodoRef = push(userTodosRef);
    await update(newTodoRef, newTodo);

    setNewTodo({
      title: '',
      priority: 'medium',
      status: 'pending',
    });
  };

  // Logout the user and redirect to login page
  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('userId');
      navigate('/login');
    }).catch((error) => {
      console.error('Logout Error:', error);
    });
  };

  return (
    <div className="tasks-container">
      <nav className="navbar">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="main-content">
        <AddTodo newTodo={newTodo} handleInputChange={handleInputChange} handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default Tasks;
