import api from '../../api/axiosInstance';

const R = '/api/resource/Shipment';

export const getShipments = (params) => api.get(R, { params });
export const getShipment = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createShipment = (data) => api.post(R, data);
export const updateShipment = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteShipment = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const submitShipment = (name) => api.post('/api/method/frappe.client.submit', { doctype: 'Shipment', name });
export const trackShipment = (name) => api.post('/api/method/erpnext.stock.doctype.shipment.shipment.track_shipment', { name });
