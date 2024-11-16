import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../../api';

function CarFormPage({ token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  const navigate = useNavigate(); // Added useNavigate hook

  // Handles form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags, // Send this as a plain string
    };

    console.log('Submitting car data:', carData);

    try {
      await createCar(carData, token); // Ensure createCar is sending a JSON payload
      alert('Car added successfully!');
      setFormData({ title: '', description: '', tags: '' }); // Clear form after success
      navigate('/home'); // Navigate to /home after success
    } catch (error) {
      console.error('Error adding car:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Error adding car. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Add a New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Car Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            value={formData.title}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleChange}
            value={formData.tags}
          />
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
}

export default CarFormPage;
