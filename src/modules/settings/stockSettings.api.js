import api from '../../api/axiosInstance';

export const getStockSettings = () => api.get('/api/resource/Stock Settings');
export const updateStockSettings = (data) => api.put('/api/resource/Stock Settings/Stock Settings', data);

export const getInventoryDimensions = (params) => api.get('/api/resource/Inventory Dimension', { params });
export const createInventoryDimension = (data) => api.post('/api/resource/Inventory Dimension', data);

export const getItemAlternatives = (params) => api.get('/api/resource/Item Alternative', { params });
export const createItemAlternative = (data) => api.post('/api/resource/Item Alternative', data);
