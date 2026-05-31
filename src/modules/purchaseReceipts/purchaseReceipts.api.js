import api from '../../api/axiosInstance';

const R = '/api/resource/Purchase Receipt';

export const getPurchaseReceipts = (params) => api.get(R, { params });
export const getPurchaseReceipt = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createPurchaseReceipt = (data) => api.post(R, data);
export const updatePurchaseReceipt = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deletePurchaseReceipt = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitPurchaseReceipt = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Purchase Receipt', name });
export const cancelPurchaseReceipt = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Purchase Receipt', name });
