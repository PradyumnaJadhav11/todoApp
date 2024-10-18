import './styles.css'; // Import the CSS file


// src/App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/signup';
import Login from './components/Login';
import Tasks from './components/Tasks';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path "/" to "/signup" */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Define your routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />

        {/* Optional: Handle undefined routes */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
