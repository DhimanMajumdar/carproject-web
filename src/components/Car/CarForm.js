import { useState } from "react";
import { createCar } from "../../api";

function CarForm({ token }) {
    const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createCar(formData, token);
        alert('Car added successfully!');
      } catch (error) {
        alert('Error adding car');
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Add a Car</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Car Title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChange}
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
  export default CarForm;