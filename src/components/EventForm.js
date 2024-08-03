import React, { useState } from 'react';
import { createEvent, updateEvent } from '../services/api';

const EventForm = ({ event, token, onSuccess }) => {
    const [name, setName] = useState(event ? event.name : '');
    const [date, setDate] = useState(event ? event.date : '');
    const [location, setLocation] = useState(event ? event.location : '');
    const [description, setDescription] = useState(event ? event.description : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (event) {
                await updateEvent(event._id, { name, date, location, description }, token);
            } else {
                await createEvent({ name, date, location, description }, token);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default EventForm;
