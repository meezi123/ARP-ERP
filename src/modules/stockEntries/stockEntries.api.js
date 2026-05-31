import api from '../../api/axiosInstance';

const R = '/api/resource/Stock Entry';

export const getStockEntries = (params) => api.get(R, { params });
export const getStockEntry = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createStockEntry = (data) => api.post(R, data);
export const updateStockEntry = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteStockEntry = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitStockEntry = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Stock Entry', name });
export const cancelStockEntry = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Stock Entry', name });
