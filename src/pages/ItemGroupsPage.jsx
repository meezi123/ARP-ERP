import { useState } from 'react';
import ItemGroupList from '../modules/itemGroups/ItemGroupList';
import Drawer from '../components/ui/Drawer';
import ItemGroupForm from '../modules/itemGroups/ItemGroupForm';

export default function ItemGroupsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [key, setKey] = useState(0);

  const handleSuccess = () => {
    setKey(k => k + 1);
    setDrawerOpen(false);
    setEditTarget(null);
  };

  const openEdit = (row) => {
    setEditTarget(row);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditTarget(null);
  };

  return (
    <>
      <ItemGroupList key={key} onCreateClick={() => setDrawerOpen(true)} onEditClick={openEdit} />
      <Drawer open={drawerOpen} onClose={closeDrawer} title={editTarget ? 'Edit Item Group' : 'New Item Group'}>
        <ItemGroupForm
          key={editTarget?.name ?? 'new'}
          defaultValues={editTarget}
          onSuccess={handleSuccess}
          onClose={closeDrawer}
        />
      </Drawer>
    </>
  );
}
