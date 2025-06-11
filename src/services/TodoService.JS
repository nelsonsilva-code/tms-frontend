import axios from 'axios';
import {getToken} from "./AuthService.JS";

// const REST_API_BASE_URL = 'http://tms-api.local:8080/api/todo'; // Uncomment this line if you want to use a different base URL for the API -> currently causes call delays
const REST_API_BASE_URL = 'http://localhost:8080/api/todo';

axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken()

    return config;
}, function (error) {
    return Promise.reject(error);
})

export const listTodos = () =>  axios.get(`${REST_API_BASE_URL}`, {})

export const createTodo = (todoData) => axios.post(`${REST_API_BASE_URL}/create`, todoData)

export const updateTodo = (todoData, id) => axios.put(`${REST_API_BASE_URL}/${id}/update`, todoData)

export const getTodo = (id) => axios.get(`${REST_API_BASE_URL}/${id}`)

export const deleteTodo = id => axios.delete(`${REST_API_BASE_URL}/${id}/delete`)

export const completeTodo = (id) => axios.patch(`${REST_API_BASE_URL}/${id}/complete`)

export const incompleteTodo = (id) => axios.patch(`${REST_API_BASE_URL}/${id}/incomplete`)