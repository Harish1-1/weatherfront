import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export const register = (username, password) => {
    console.log('Registering user:', username);
    return axios.post(`${API_URL}auth/register`, { username, password });
};

export const login = (username, password) => {
    console.log('Logging in user:', username);
    return axios.post(`${API_URL}auth/login`, { username, password })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            return response;
        });
};

export const logout = (token) => {
    console.log('Logging out user');
    return axios.post(`${API_URL}auth/logout`, {}, { headers: { 'Authorization': token } })
        .then(response => {
            localStorage.removeItem('token');
            return response;
        });
};

export const createEvent = (event, token) => {
    console.log('Creating event:', event);
    return axios.post(`${API_URL}events`, event, { headers: { 'Authorization': token } });
};

export const getEvents = (token) => {
    console.log('Getting events with token:', token);
    return axios.get(`${API_URL}events`, { headers: { 'Authorization': token } });
};

export const updateEvent = (id, event, token) => {
    console.log('Updating event with ID:', id);
    return axios.put(`${API_URL}events/${id}`, event, { headers: { 'Authorization': token } });
};

export const deleteEvent = (id, token) => {
    console.log('Deleting event with ID:', id);
    return axios.delete(`${API_URL}events/${id}`, { headers: { 'Authorization': token } });
};

export const getWeather = (location) => {
    console.log('Getting weather for location:', location);
    return axios.get(`${API_URL}weather/${location}`);
};
