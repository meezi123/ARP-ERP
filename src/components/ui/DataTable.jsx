import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations';

export default function DataTable({
  columns,
  data = [],
  loading,
  onRowClick,
  selectedRows,
  onSelectRow,
  bulkActions,
}) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <div className="overflow-x-auto">
      {selectedRows?.length > 0 && bulkActions && (
        <motion.div
          className="flex items-center gap-3 px-4 py-2 mb-2 rounded-lg"
          style={{ background: 'rgba(109,31,58,0.12)', border: 'var(--glass-border-neon)' }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        >
          <span className="label-caps">{selectedRows.length} selected</span>
          {bulkActions}
        </motion.div>
      )}
      <table className="data-table">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {onSelectRow && (
                <th style={{ width: 40 }}>
                  <input type="checkbox" aria-label="Select all" style={{ accentColor: 'var(--color-brand-accent)' }} />
                </th>
              )}
              {hg.headers.map(header => (
                <th
                  key={header.id}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default', userSelect: 'none' }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1.5">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <span style={{ opacity: 0.5 }}>
                        {header.column.getIsSorted() === 'asc' ? <ChevronUp size={12} /> :
                          header.column.getIsSorted() === 'desc' ? <ChevronDown size={12} /> :
                            <ChevronsUpDown size={12} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: columns.length + (onSelectRow ? 1 : 0) }).map((_, j) => (
                  <td key={j}><div className="skeleton h-4 w-full" /></td>
                ))}
              </tr>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onSelectRow ? 1 : 0)} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>
                No records found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, idx) => (
              <motion.tr
                key={row.id}
                onClick={() => onRowClick?.(row.original)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                {onSelectRow && (
                  <td onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows?.includes(row.original.name)}
                      onChange={() => onSelectRow(row.original.name)}
                      aria-label="Select row"
                      style={{ accentColor: 'var(--color-brand-accent)' }}
                    />
                  </td>
                )}
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
