import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Ensure backend URL is used

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

export const fetchCars = (token, searchKeyword = '') =>
  axios.get(`${API_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { search: searchKeyword }, // Add search parameter if any
  });

export const fetchCarById = (id, token) =>
  axios.get(`${API_URL}/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createCar = async (carData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // If authentication is needed
    },
  };

  const response = await axios.post('http://localhost:5000/api/cars/', carData, config);
  return response.data;
};

export const updateCar = (id, carData, token) =>
  axios.put(`${API_URL}/cars/${id}`, carData, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  export const deleteCar = (id, token) =>
    axios.delete(`${API_URL}/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // Include Authorization header
    });

