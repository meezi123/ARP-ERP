import api from '../../api/axiosInstance';

export const REPORTS = [
  'Stock Balance',
  'Stock Ledger',
  'Batch-Wise Balance History',
  'Serial No Ledger',
  'Stock Ageing',
  'Item-wise Sales History',
  'Item-wise Purchase History',
  'Warehouse-wise Item Balance',
  'Slow Moving Item Analysis',
  'Projected Stock',
  'Reorder Point Report',
  'Delivery Performance',
  'Landed Cost Summary',
];

export const getReport = (reportName, filters = {}) =>
  api.get('/api/method/frappe.desk.reportview.get', { params: { report_name: reportName, filters: JSON.stringify(filters) } });

export const getStockBalance = (params) =>
  api.get('/api/method/erpnext.stock.utils.get_stock_balance', { params });

export const getLatestStockQty = (params) =>
  api.get('/api/method/erpnext.stock.utils.get_latest_stock_qty', { params });
