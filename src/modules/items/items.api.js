import api from '../../api/axiosInstance';

const R = '/api/resource/Item';

export const getItems = (params) => api.get(R, { params });
export const getItem = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createItem = (data) => api.post(R, data);
export const updateItem = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteItem = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);

export const getItemPrices = (params) => api.get('/api/resource/Item Price', { params });
export const createItemPrice = (data) => api.post('/api/resource/Item Price', data);
export const updateItemPrice = (name, data) => api.put(`/api/resource/Item Price/${encodeURIComponent(name)}`, data);
export const deleteItemPrice = (name) => api.delete(`/api/resource/Item Price/${encodeURIComponent(name)}`);
