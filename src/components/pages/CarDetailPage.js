import React, { useEffect, useState } from 'react';
import { fetchCarById, deleteCar, updateCar } from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

function CarDetailPage({ token }) {
  const { id } = useParams(); // Get car ID from URL
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  // Function to load car data from API
  const loadCar = async () => {
    try {
      const { data } = await fetchCarById(id, token); // Fetch car details from backend
      setCar(data);
      setFormData({
        title: data.title,
        description: data.description,
        tags: data.tags.join(', '), // Convert array to string for editing
      });
    } catch (error) {
      alert('Error fetching car details');
    }
  };

  useEffect(() => {
    loadCar();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await deleteCar(id, token); // Call the delete API
      alert('Car deleted successfully!');
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error deleting car:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Error deleting car. Please try again.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Construct carData object directly
    const carData = {
      title: formData.title,
      description: formData.description,
      tags: formData.tags,
    };
  
    try {
      // Call API to update the car
      const response = await updateCar(id, carData, token);
  
      // Log the updated car data from the response
      console.log('Updated car in response:', response.data);
  
      // Directly set the updated car in state immediately
      setCar(response.data);  // Set the updated car in state
      setFormData({
        title: response.data.title,
        description: response.data.description,
        tags: response.data.tags.join(', '), // Ensure tags are joined as a string for display
      });
  
      // Optionally, close the edit mode after update
      setIsEditing(false);
  
      alert('Car updated successfully!');
    } catch (error) {
      alert('Error updating car');
      console.error('Update error:', error);
    }
  };
  
  return car ? (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
          {isEditing ? 'Edit Car Details' : 'Car Details'}
        </h2>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="Tags (comma-separated)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-lg hover:bg-secondary transition"
            >
              Update Car
            </button>
          </form>
        ) : (
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Title:</strong> {car.title}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {car.description}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Tags:</strong> {car.tags.join(', ')}
            </p>
          </div>
        )}

        <div className="flex space-x-4 mt-4">
          <button
            onClick={handleEditToggle}
            className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-secondary transition"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">Loading car details...</p>
  );
}

export default CarDetailPage;
