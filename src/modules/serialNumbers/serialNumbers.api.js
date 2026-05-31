import api from '../../api/axiosInstance';

const R = '/api/resource/Serial No';

export const getSerialNos = (params) => api.get(R, { params });
export const getSerialNo = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createSerialNo = (data) => api.post(R, data);
export const updateSerialNo = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteSerialNo = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
