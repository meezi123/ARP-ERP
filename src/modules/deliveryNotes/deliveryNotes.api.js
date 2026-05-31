import api from '../../api/axiosInstance';

const R = '/api/resource/Delivery Note';

export const getDeliveryNotes = (params) => api.get(R, { params });
export const getDeliveryNote = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createDeliveryNote = (data) => api.post(R, data);
export const updateDeliveryNote = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteDeliveryNote = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitDeliveryNote = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Delivery Note', name });
export const cancelDeliveryNote = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Delivery Note', name });
