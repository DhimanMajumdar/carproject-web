import React, { useState } from 'react';
import { createCar } from '../../api';

function CarFormPage({ token }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = new FormData();
    carData.append('title', formData.title);
    carData.append('description', formData.description);
    carData.append('tags', formData.tags);
    if (image) {
      carData.append('images', image); // Attach the image
    }

    try {
      await createCar(carData, token);
      alert('Car added successfully!');
    } catch (error) {
      alert('Error adding car.');
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
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2 px-4 border rounded-lg focus:outline-none"
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
