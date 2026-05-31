import api from '../../api/axiosInstance';

const R = '/api/resource/Stock Reconciliation';

export const getReconciliations = (params) => api.get(R, { params });
export const getReconciliation = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createReconciliation = (data) => api.post(R, data);
export const updateReconciliation = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteReconciliation = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitReconciliation = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Stock Reconciliation', name });
export const cancelReconciliation = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Stock Reconciliation', name });
