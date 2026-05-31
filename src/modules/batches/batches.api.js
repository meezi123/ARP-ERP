import api from '../../api/axiosInstance';

const R = '/api/resource/Batch';

export const getBatches = (params) => api.get(R, { params });
export const getBatch = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createBatch = (data) => api.post(R, data);
export const updateBatch = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteBatch = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const getBatchQty = (params) =>
  api.get('/api/method/erpnext.stock.doctype.batch.batch.get_batch_qty', { params });
