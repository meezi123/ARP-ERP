import api from '../../api/axiosInstance';

const R = '/api/resource/Delivery Trip';

export const getDeliveryTrips = (params) => api.get(R, { params });
export const getDeliveryTrip = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createDeliveryTrip = (data) => api.post(R, data);
export const updateDeliveryTrip = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteDeliveryTrip = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitDeliveryTrip = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Delivery Trip', name });
