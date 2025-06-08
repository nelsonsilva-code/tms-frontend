import axios from 'axios';

const REST_API_BASE_URL = 'http://tms-api.local:8080/api/auth';

export const createUser = (userData) => axios.post(`${REST_API_BASE_URL}/register`, userData)

