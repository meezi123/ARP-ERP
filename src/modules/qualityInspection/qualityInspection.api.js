import api from '../../api/axiosInstance';

const R = '/api/resource/Quality Inspection';

export const getInspections = (params) => api.get(R, { params });
export const getInspection = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createInspection = (data) => api.post(R, data);
export const updateInspection = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteInspection = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitInspection = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Quality Inspection', name });
export const cancelInspection = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Quality Inspection', name });

export const getTemplates = (params) => api.get('/api/resource/Quality Inspection Template', { params });
export const createTemplate = (data) => api.post('/api/resource/Quality Inspection Template', data);
