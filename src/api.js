import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const login = (userData) => axios.post(`${API_URL}/users/login`, userData);

export const fetchCars = (token, searchKeyword = '') =>
  axios.get(`${API_URL}/cars`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { search: searchKeyword }, // Add search parameter if any
  });

export const fetchCarById = (id, token) =>
  axios.get(`${API_URL}/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
export const createCar = (carData, token) =>
  axios.post(`${API_URL}/cars`, carData, { headers: { Authorization: `Bearer ${token}` } });
export const updateCar = (id, carData, token) =>
  axios.put(`${API_URL}/cars/${id}`, carData, { headers: { Authorization: `Bearer ${token}` } });
export const deleteCar = (id, token) =>
  axios.delete(`${API_URL}/cars/${id}`, { headers: { Authorization: `Bearer ${token}` } });
