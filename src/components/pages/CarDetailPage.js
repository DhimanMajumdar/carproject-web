import React, { useEffect, useState } from 'react';
import { fetchCarById, deleteCar, updateCar } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

function CarDetailPage({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    const loadCar = async () => {
      try {
        const { data } = await fetchCarById(id, token);
        setCar(data);
        setFormData({
          title: data.title,
          description: data.description,
          tags: data.tags.join(', '),
        });
      } catch (error) {
        console.error('Error fetching car details:', error); // More detailed error logging
        alert('Error fetching car details');
      } finally {
        setIsLoading(false); // Set loading to false when done
      }
    };
    loadCar();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await deleteCar(id, token);
      alert('Car deleted successfully!');
      navigate('/'); // Redirect after successful delete
    } catch (error) {
      console.error('Error deleting car:', error); // Log error details
      alert('Error deleting car');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0])   
 {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateCar(id, { ...formData, tags: formData.tags.split(',') }, token);
      alert('Car updated successfully!');
      setIsEditing(false);
      const { data } = await fetchCarById(id, token);
      setCar(data);
    } catch (error) {
      console.error('Error updating car:', error); // Log error details
      alert('Error updating car');
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Loading car details...</p>;
  }

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
            <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
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
    <p className="text-gray-500">Car not found or an error occurred.</p>
  );
}

export default CarDetailPage;
