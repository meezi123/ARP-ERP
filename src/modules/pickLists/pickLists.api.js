import api from '../../api/axiosInstance';

const R = '/api/resource/Pick List';

export const getPickLists = (params) => api.get(R, { params });
export const getPickList = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createPickList = (data) => api.post(R, data);
export const updatePickList = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deletePickList = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitPickList = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Pick List', name });
