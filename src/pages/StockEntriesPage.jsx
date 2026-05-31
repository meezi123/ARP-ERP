import { useState } from 'react';
import StockEntryList from '../modules/stockEntries/StockEntryList';
import Drawer from '../components/ui/Drawer';
import StockEntryForm from '../modules/stockEntries/StockEntryForm';

export default function StockEntriesPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [key, setKey] = useState(0);
  return (
    <>
      <StockEntryList key={key} onCreateClick={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New Stock Entry" width="680px">
        <StockEntryForm onSuccess={() => { setKey(k => k + 1); setDrawerOpen(false); }} onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
