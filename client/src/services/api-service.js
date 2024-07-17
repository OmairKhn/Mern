
import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export const getAllUsers = () => {
  return axios.get(`${baseUrl}/getAllUsers`);
};  

export const getUserById = (id) => {
  return axios.get(`${baseUrl}/getUser/${id}`);
};

export const updateUser = (id, userData) => {
  return axios.put(`${baseUrl}/updateUser/${id}`, userData);
};

export const createUser = (userData) => {
  return axios.post(`${baseUrl}/createUser`, userData);
};