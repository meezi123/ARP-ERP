import api from '../../api/axiosInstance';

const R = '/api/resource/Landed Cost Voucher';

export const getLandedCostVouchers = (params) => api.get(R, { params });
export const getLandedCostVoucher = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createLandedCostVoucher = (data) => api.post(R, data);
export const updateLandedCostVoucher = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteLandedCostVoucher = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitLandedCostVoucher = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Landed Cost Voucher', name });
export const cancelLandedCostVoucher = (name) => api.post('/api/method/frappe.client.cancel', { doctype: 'Landed Cost Voucher', name });
