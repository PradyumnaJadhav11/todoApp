// src/components/SignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { ref, set } from 'firebase/database'; // Import database functions

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save the new user data in Firebase Database
      const userRef = ref(db, `users/${user.uid}`);
      await set(userRef, {
        email: email,
        password: password, // Optional: You can store hashed password instead for better security
        todos: [] // Start with an empty todo list
      });

      // Store user information in localStorage
      localStorage.setItem('userId', user.uid);

      // Navigate to the tasks page after signup
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
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
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-redirect">
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUp;
