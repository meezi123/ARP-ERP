import api from '../../api/axiosInstance';

const R = '/api/resource/Packing Slip';

export const getPackingSlips = (params) => api.get(R, { params });
export const getPackingSlip = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createPackingSlip = (data) => api.post(R, data);
export const updatePackingSlip = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deletePackingSlip = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitPackingSlip = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Packing Slip', name });
