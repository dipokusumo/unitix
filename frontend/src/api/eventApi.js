import axiosInstance from "./axiosInstance";

const getAllAdmin = async () => {
    const { data } = await axiosInstance.get('/events-admin', {
        requiresAuth: true,
    });
    return data;
};

const getAll = async () => {
    const { data } = await axiosInstance.get('/events');
    return data;
};

const getUpcomingEvents = async () => {
    const { data } = await axiosInstance.get('/events/upcoming');
    return data;
};

const getRecommendedEvents = async () => {
    const { data } = await axiosInstance.get('/events/recommended');
    return data;
};

const createEvent = async (eventData) => {
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('dateTime', eventData.dateTime);
    formData.append('location', eventData.location);
    formData.append('description', eventData.description);
    formData.append('quota', eventData.quota);
    formData.append('ticketPrice', eventData.ticketPrice);
    formData.append('posterUrl', eventData.posterUrl);
    formData.append('eventBy', eventData.eventBy);

    const { data } = await axiosInstance.post('/event', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        requiresAuth: true,
    });
    return data;
};

const getEventById = async (id) => {
    const { data } = await axiosInstance.get(`/event/${id}`);
    return data;
};

const updateEvent = async (id, eventData) => {
    const formData = new FormData();
    formData.append('name', eventData.name);
    formData.append('dateTime', eventData.dateTime);
    formData.append('location', eventData.location);
    formData.append('description', eventData.description);
    formData.append('quota', eventData.quota);
    formData.append('ticketPrice', eventData.ticketPrice);
    formData.append('posterUrl', eventData.posterUrl);
    formData.append('eventBy', eventData.eventBy);

    const { data } = await axiosInstance.put(`/event/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        requiresAuth: true,
    });
    return data;
};

const deleteEvent = async (id) => {
    const { data } = await axiosInstance.delete(`/event/${id}`, {
        requiresAuth: true,
    });
    return data;
};

const filter = async ( location, date ) => {
    const { data } = await axiosInstance.get(`/events/filter?location=${location}&date=${date}`);
    return data;
};

const optionFilter = async () => {
    const { data } = await axiosInstance.get('/events/filter-option');
    return data;
};

const search = async ( keyword ) => {
    const { data } = await axiosInstance.get(`/events/search?keyword=${keyword}`);
    return data;
};

const summary = async (id) => {
    const { data } = await axiosInstance.get(`/events/summary/${id}`, {
        requiresAuth: true,
    });
    return data;
};

export const eventApi = {
    getAllAdmin,
    getAll,
    getUpcomingEvents,
    getRecommendedEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    filter,
    optionFilter,
    search,
    summary,
};
