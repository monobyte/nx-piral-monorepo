/**
 * Type definitions for @proj/grid
 */

import type {
  ColDef,
  GridApi as AgGridApi,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';
import type * as React from 'react';

/**
 * Available grid themes
 */
export type GridTheme =
  | 'ag-theme-quartz'
  | 'ag-theme-quartz-dark'
  | 'ag-theme-alpine'
  | 'ag-theme-alpine-dark'
  | 'ag-theme-balham'
  | 'ag-theme-balham-dark';

/**
 * Extended column definition with additional options
 */
export interface GridColumn<TData = unknown> {
  /** Column field name (property on row data) */
  field: string;
  /** Display header name */
  headerName?: string;
  /** Column width in pixels */
  width?: number;
  /** Minimum column width */
  minWidth?: number;
  /** Maximum column width */
  maxWidth?: number;
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Enable filtering for this column */
  filter?: boolean | string;
  /** Enable resizing for this column */
  resizable?: boolean;
  /** Pin column to left or right */
  pinned?: 'left' | 'right' | null;
  /** Custom value formatter */
  valueFormatter?: (params: ValueFormatterParams<TData>) => string;
  /** Custom cell renderer component */
  cellRenderer?: React.ComponentType<{ value: unknown; data: TData }>;
}

/**
 * Props for the DataGrid component
 */
export interface DataGridProps<TData = unknown> {
  /** Array of row data to display */
  rowData: TData[];
  /** Column definitions */
  columnDefs: GridColumn<TData>[];
  /** Grid height (default: 400) */
  height?: number | string;
  /** Grid theme (default: 'ag-theme-quartz') */
  theme?: GridTheme;
  /** Enable row selection */
  rowSelection?: 'single' | 'multiple';
  /** Callback when selection changes */
  onSelectionChanged?: (selectedRows: TData[]) => void;
  /** Callback when grid is ready */
  onGridReady?: (api: AgGridApi<TData>) => void;
  /** Callback when cell is clicked */
  onCellClicked?: (data: TData, field: string) => void;
  /** Enable pagination */
  pagination?: boolean;
  /** Page size (default: 10) */
  paginationPageSize?: number;
  /** Auto-size columns to fit content */
  autoSizeColumns?: boolean;
  /** Enable suppression of horizontal scroll */
  suppressHorizontalScroll?: boolean;
  /** Loading overlay */
  loading?: boolean;
  /** No rows overlay message */
  noRowsMessage?: string;
  /** Additional AG-Grid options */
  gridOptions?: Partial<GridOptions<TData>>;
  /** Additional className for the grid wrapper */
  className?: string;
}

/**
 * Grid API type alias
 */
export type GridApi<TData = unknown> = AgGridApi<TData>;

/**
 * Re-export ColDef for advanced usage
 */
export type { ColDef };
