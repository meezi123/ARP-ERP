import api from '../../api/axiosInstance';

export const getStockLedgerEntries = (params) =>
  api.get('/api/resource/Stock Ledger Entry', { params });
export const getStockLedgerEntry = (name) =>
  api.get(`/api/resource/Stock Ledger Entry/${encodeURIComponent(name)}`);
