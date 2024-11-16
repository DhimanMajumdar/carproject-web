import axios from 'axios';

// Use environment variable for API URL, with a fallback to localhost if not defined
const API_URL = process.env.REACT_APP_API_URL;


// Register user
export const register = (userData) => axios.post(`${API_URL}/api/users/register`, userData);

// Login user
export const login = (userData) => axios.post(`${API_URL}/api/users/login`, userData);

// Fetch cars with optional search keyword
export const fetchCars = (token, searchKeyword = '') =>
  axios.get(`${API_URL}/api/cars`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { search: searchKeyword }, // Add search parameter if any
  });

// Fetch a car by its ID
export const fetchCarById = (id, token) =>
  axios.get(`${API_URL}/api/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Create a new car
export const createCar = async (carData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/cars/`, carData, config);
  return response.data;
};

// Update an existing car
export const updateCar = (id, carData, token) =>
  axios.put(`${API_URL}/api/cars/${id}`, carData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Delete a car
export const deleteCar = (id, token) =>
  axios.delete(`${API_URL}/api/cars/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
