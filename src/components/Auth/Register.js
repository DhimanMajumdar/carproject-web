import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration successful!');
      onRegister(); // Notify parent that registration is complete
      navigate('/login'); // Redirect to Login Page
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="eg:Cristiano(Straightaway login , you'll get it)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="eg:Cristiano@123(Straightaway login)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-primary underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
