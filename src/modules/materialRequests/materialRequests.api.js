import api from '../../api/axiosInstance';

const R = '/api/resource/Material Request';

export const getMaterialRequests = (params) => api.get(R, { params });
export const getMaterialRequest = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createMaterialRequest = (data) => api.post(R, data);
export const updateMaterialRequest = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteMaterialRequest = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitMaterialRequest = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Material Request', name });
export const cancelMaterialRequest = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Material Request', name });
