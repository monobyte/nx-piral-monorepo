/**
 * @proj/grid
 * Pre-configured AG-Grid wrapper for the monorepo
 *
 * This package exports:
 * - DataGrid: A pre-configured AG-Grid React component
 * - Grid types and interfaces
 * - AG-Grid theme styles
 */

// Export the main DataGrid component
export { DataGrid } from './components/DataGrid';

// Export types
export type {
  GridColumn,
  DataGridProps,
  GridTheme,
  GridApi,
} from './types';

// Re-export commonly used AG-Grid types for convenience
export type {
  ColDef,
  GridOptions,
  GridReadyEvent,
  RowSelectedEvent,
  CellClickedEvent,
  ValueFormatterParams,
  ICellRendererParams,
} from 'ag-grid-community';

// Export AG-Grid modules and utilities
export {
  ModuleRegistry,
  ClientSideRowModelModule,
} from 'ag-grid-community';

/**
 * Styles must be imported separately in your application:
 *
 * import 'ag-grid-community/styles/ag-grid.css';
 * import 'ag-grid-community/styles/ag-theme-quartz.css';
 *
 * Or import the pre-bundled styles from this package:
 * import '@proj/grid/styles';
 */
