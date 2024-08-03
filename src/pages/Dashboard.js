import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeather, createEvent, getEvents, deleteEvent, logout } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({ name: '', date: '', location: '', description: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Getting events with token:', token);
                const response = await getEvents(token);
                setEvents(response.data);
            } catch (error) {
                console.error('Get events error:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleGetWeather = async () => {
        try {
            const response = await getWeather(location);
            setWeather(response.data);
        } catch (error) {
            console.error('Get weather error:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await logout(token);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log('Creating event with token:', token);
            const createResponse = await createEvent(event, token);
            console.log('Create event response:', createResponse);

            setEvent({ name: '', date: '', location: '', description: '' });
            const response = await getEvents(token);
            setEvents(response.data);
        } catch (error) {
            console.error('Create event error:', error);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            await deleteEvent(eventId, token);
            setEvents(events.filter(event => event._id !== eventId));
        } catch (error) {
            console.error('Delete event error:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="location-input"
            />
            <button className="get-weather-button" onClick={handleGetWeather}>Get Weather</button>
            {weather && (
                <div className="weather-info">
                    <h3>Weather in {weather.name}</h3>
                    <p>Temperature: {weather.main.temp}°K</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
            <form onSubmit={handleEventSubmit} className="event-form">
                <input type="text" name="name" value={event.name} onChange={handleEventChange} placeholder="Event Name" required />
                <input type="date" name="date" value={event.date} onChange={handleEventChange} required />
                <input type="text" name="location" value={event.location} onChange={handleEventChange} placeholder="Event Location" required />
                <textarea name="description" value={event.description} onChange={handleEventChange} placeholder="Event Description" required></textarea>
                <button type="submit">Create Event</button>
            </form>
            <div className="event-list">
                {events.map((event) => (
                    <div key={event._id} className="event-card">
                        <h3>{event.name}</h3>
                        <p>{event.date}</p>
                        <p>{event.location}</p>
                        <p>{event.description}</p>
                        <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
