import api from '../../api/axiosInstance';

const R = '/api/resource/Price List';

export const getPriceLists = (params) => api.get(R, { params });
export const getPriceList = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createPriceList = (data) => api.post(R, data);
export const updatePriceList = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deletePriceList = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
