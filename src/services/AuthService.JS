import axios from 'axios';

const REST_API_BASE_URL = 'http://tms-api.local:8080/api/auth';

export const registerApi = (userData) => axios.post(`${REST_API_BASE_URL}/register`, userData)

export const loginApi = (username, password) => axios.post(`${REST_API_BASE_URL}/login`, username, password)
