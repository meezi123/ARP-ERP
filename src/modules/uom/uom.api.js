import api from '../../api/axiosInstance';

export const getUOMs = (params) => api.get('/api/resource/UOM', { params });
export const createUOM = (data) => api.post('/api/resource/UOM', data);
export const getConversionFactors = (params) => api.get('/api/resource/UOM Conversion Factor', { params });
export const createConversionFactor = (data) => api.post('/api/resource/UOM Conversion Factor', data);
export const updateConversionFactor = (name, data) => api.put(`/api/resource/UOM Conversion Factor/${encodeURIComponent(name)}`, data);
