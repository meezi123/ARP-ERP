import api from '../../api/axiosInstance';

const R = '/api/resource/Putaway Rule';

export const getPutawayRules = (params) => api.get(R, { params });
export const getPutawayRule = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createPutawayRule = (data) => api.post(R, data);
export const updatePutawayRule = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deletePutawayRule = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const applyPutawayRule = (body) =>
  api.post('/api/method/erpnext.stock.doctype.putaway_rule.putaway_rule.apply_putaway_rule', body);
