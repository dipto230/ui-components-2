import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  // Sorting
  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];
      if (aVal! < bVal!) return sortOrder === "asc" ? -1 : 1;
      if (aVal! > bVal!) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortOrder]);

  // Row selection
  const toggleRow = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  // Loading skeleton shimmer
  if (loading) {
    return (
      <div className="p-4 space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  // Empty state with animation
  if (!data.length) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-gray-500 italic text-center"
      >
        No data available 🚀
      </motion.p>
    );
  }

  return (
    <motion.table
      className="w-full border-collapse border border-gray-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <thead>
        <tr>
          {selectable && <th className="p-2 border">Select</th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-2 border cursor-pointer select-none"
              onClick={() => {
                if (col.sortable) {
                  setSortKey(col.dataIndex as string);
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }
              }}
            >
              {col.title}
              {sortKey === col.dataIndex && (
                <span
                  className={`inline-block ml-1 transition-transform ${
                    sortOrder === "asc" ? "rotate-180" : ""
                  }`}
                >
                  ▲
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <AnimatePresence>
          {sortedData.map((row) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`transition-colors ${
                selectedRows.includes(row)
                  ? "bg-blue-100"
                  : "hover:bg-gray-50 cursor-pointer"
              }`}
            >
              {selectable && (
                <td className="p-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2 border">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </motion.tr>
          ))}
        </AnimatePresence>
      </tbody>
    </motion.table>
  );
}
