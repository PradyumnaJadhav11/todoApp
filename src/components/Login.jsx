// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { ref, get } from 'firebase/database'; // Import database functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user todos from Firebase
      const userRef = ref(db, `users/${user.uid}/todos`);
      const snapshot = await get(userRef);

      // Store user information in localStorage
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('email', email);

      if (snapshot.exists()) {
        const todos = snapshot.val();
        console.log('User todos:', todos);
        // Pass todos to tasks page
        navigate('/tasks', { state: { todos } });
      } else {
        console.log('No todos found for this user');
        navigate('/tasks', { state: { todos: [] } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="signup-redirect">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
