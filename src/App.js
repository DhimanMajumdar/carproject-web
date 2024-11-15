import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/pages/HomePage';
import CarDetailPage from './components/pages/CarDetailPage';
import CarFormPage from './components/pages/CarFormPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/register" />} />
          {/* Public Routes */}
          <Route path="/login" element={<Login setAuthToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          {/* Private Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/car/:id"
            element={
              <PrivateRoute>
                <CarDetailPage token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-car"
            element={
              <PrivateRoute>
                <CarFormPage token={token} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
