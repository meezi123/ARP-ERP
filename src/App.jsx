import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ItemsPage from './pages/ItemsPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemGroupsPage from './pages/ItemGroupsPage';
import WarehousesPage from './pages/WarehousesPage';
import BinBalancesPage from './pages/BinBalancesPage';
import UOMPage from './pages/UOMPage';
import BatchesPage from './pages/BatchesPage';
import SerialNumbersPage from './pages/SerialNumbersPage';
import StockEntriesPage from './pages/StockEntriesPage';
import StockEntryDetailPage from './pages/StockEntryDetailPage';
import StockReconciliationPage from './pages/StockReconciliationPage';
import StockLedgerPage from './pages/StockLedgerPage';
import MaterialRequestsPage from './pages/MaterialRequestsPage';
import PurchaseReceiptsPage from './pages/PurchaseReceiptsPage';
import DeliveryNotesPage from './pages/DeliveryNotesPage';
import PickListsPage from './pages/PickListsPage';
import PackingSlipsPage from './pages/PackingSlipsPage';
import ShipmentsPage from './pages/ShipmentsPage';
import DeliveryTripsPage from './pages/DeliveryTripsPage';
import LandedCostPage from './pages/LandedCostPage';
import QualityInspectionPage from './pages/QualityInspectionPage';
import StockReservationPage from './pages/StockReservationPage';
import PriceListsPage from './pages/PriceListsPage';
import PutawayRulesPage from './pages/PutawayRulesPage';
import ReportsPage from './pages/ReportsPage';
import ReportViewPage from './pages/ReportViewPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/items/:name" element={<ItemDetailPage />} />
        <Route path="/item-groups" element={<ItemGroupsPage />} />
        <Route path="/warehouses" element={<WarehousesPage />} />
        <Route path="/bin-balances" element={<BinBalancesPage />} />
        <Route path="/uom" element={<UOMPage />} />
        <Route path="/batches" element={<BatchesPage />} />
        <Route path="/serial-numbers" element={<SerialNumbersPage />} />
        <Route path="/stock-entries" element={<StockEntriesPage />} />
        <Route path="/stock-entries/:name" element={<StockEntryDetailPage />} />
        <Route path="/stock-reconciliation" element={<StockReconciliationPage />} />
        <Route path="/stock-ledger" element={<StockLedgerPage />} />
        <Route path="/material-requests" element={<MaterialRequestsPage />} />
        <Route path="/purchase-receipts" element={<PurchaseReceiptsPage />} />
        <Route path="/delivery-notes" element={<DeliveryNotesPage />} />
        <Route path="/pick-lists" element={<PickListsPage />} />
        <Route path="/packing-slips" element={<PackingSlipsPage />} />
        <Route path="/shipments" element={<ShipmentsPage />} />
        <Route path="/delivery-trips" element={<DeliveryTripsPage />} />
        <Route path="/landed-cost" element={<LandedCostPage />} />
        <Route path="/quality-inspection" element={<QualityInspectionPage />} />
        <Route path="/stock-reservation" element={<StockReservationPage />} />
        <Route path="/price-lists" element={<PriceListsPage />} />
        <Route path="/putaway-rules" element={<PutawayRulesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/reports/:reportName" element={<ReportViewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
