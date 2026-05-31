import api from '../../api/axiosInstance';

const R = '/api/resource/Warehouse';

export const getWarehouses = (params) => api.get(R, { params });
export const getWarehouse = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createWarehouse = (data) => api.post(R, data);
export const updateWarehouse = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteWarehouse = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);

export const getBins = (params) => api.get('/api/resource/Bin', { params });
export const getBin = (itemCode, warehouse) =>
  api.get('/api/method/erpnext.stock.utils.get_bin', { params: { item_code: itemCode, warehouse } });
