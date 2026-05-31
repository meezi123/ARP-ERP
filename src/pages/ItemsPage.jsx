import { useState } from 'react';
import ItemList from '../modules/items/ItemList';
import Drawer from '../components/ui/Drawer';
import ItemForm from '../modules/items/ItemForm';

export default function ItemsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <>
      <ItemList key={key} onCreateClick={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="New Item">
        <ItemForm onSuccess={() => { setKey(k => k + 1); setDrawerOpen(false); }} onClose={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  );
}
