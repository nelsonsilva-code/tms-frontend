import axios from 'axios';

// const REST_API_BASE_URL = 'http://tms-api.local:8080/api/auth'; // Uncomment this line if you want to use a different base URL for the API -> currently causes call delays
const REST_API_BASE_URL = 'http://localhost:8080/api/auth';

export const createUserApi = (userData) => axios.post(`${REST_API_BASE_URL}/users/create`, userData)

export const loginApi = (userData) => axios.post(`${REST_API_BASE_URL}/login`, userData)

export const getRolesApi = () => axios.get(`${REST_API_BASE_URL}/roles`)

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const storeRole = (role) => localStorage.setItem("role", role);

export const getRole = () => localStorage.getItem("role");

export const clearToken = () => {localStorage.clear();}

export const createRoleApi = (userData) => axios.post(`${REST_API_BASE_URL}/roles/create`, userData)

export const getPermissionsApi = () => axios.get(`${REST_API_BASE_URL}/permissions`)

export const getUsersApi = () => axios.get(`${REST_API_BASE_URL}/users`)

export const deleteUserApi = (id) => axios.get(`${REST_API_BASE_URL}/users/${id}/delete`)