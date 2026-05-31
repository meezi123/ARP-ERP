import api from '../../api/axiosInstance';

const R = '/api/resource/Stock Reservation Entry';

export const getReservations = (params) => api.get(R, { params });
export const getReservation = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createReservation = (data) => api.post(R, data);
export const updateReservation = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteReservation = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitReservation = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Stock Reservation Entry', name });
