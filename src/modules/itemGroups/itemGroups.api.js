import api from '../../api/axiosInstance';

const R = '/api/resource/Item Group';

export const getItemGroups = (params) => api.get(R, { params });
export const getItemGroup = (name) => api.get(`${R}/${encodeURIComponent(name)}`);
export const createItemGroup = (data) => api.post(R, data);
export const updateItemGroup = (name, data) => api.put(`${R}/${encodeURIComponent(name)}`, data);
export const deleteItemGroup = (name) => api.delete(`${R}/${encodeURIComponent(name)}`);
export const getItemGroupChildren = (parent) =>
  api.get('/api/method/frappe.desk.treeview.get_children', { params: { doctype: 'Item Group', parent } });
