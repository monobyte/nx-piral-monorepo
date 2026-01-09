import * as React from 'react';
import { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { GridReadyEvent, ColDef, GridApi, CellClickedEvent } from 'ag-grid-community';
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import type { DataGridProps, GridColumn } from '../types';

// Register AG-Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Default grid options
const defaultGridOptions = {
  animateRows: true,
  enableCellTextSelection: true,
  ensureDomOrder: true,
  suppressCellFocus: false,
};

// Inline styles for overlay
const overlayStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  fontSize: '14px',
  color: '#666',
};

// Inline styles for container
const containerBaseStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  border: '1px solid #e0e0e0',
};

/**
 * DataGrid Component
 *
 * A pre-configured AG-Grid wrapper with sensible defaults and
 * simplified API for common use cases.
 *
 * @example
 * ```tsx
 * <DataGrid
 *   rowData={data}
 *   columnDefs={columns}
 *   onSelectionChanged={handleSelection}
 *   pagination
 * />
 * ```
 */
export function DataGrid<TData = unknown>({
  rowData,
  columnDefs,
  height = 400,
  theme = 'ag-theme-quartz',
  rowSelection = 'multiple',
  onSelectionChanged,
  onGridReady,
  onCellClicked,
  pagination = false,
  paginationPageSize = 10,
  autoSizeColumns = false,
  suppressHorizontalScroll = false,
  loading = false,
  noRowsMessage = 'No data to display',
  gridOptions = {},
  className,
}: DataGridProps<TData>): React.ReactElement {
  const gridRef = useRef<AgGridReact<TData>>(null);
  const gridApiRef = useRef<GridApi<TData> | null>(null);

  // Convert our simplified column definitions to AG-Grid format
  const processedColumnDefs = useMemo<ColDef<TData>[]>(() => {
    return columnDefs.map((col: GridColumn<TData>) => {
      const { cellRenderer, field, ...rest } = col;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const colDef: ColDef<TData> = {
        ...rest,
        field: field as any,
        sortable: col.sortable ?? true,
        filter: col.filter ?? true,
        resizable: col.resizable ?? true,
      };

      // Handle custom cell renderer
      if (cellRenderer) {
        const CellRendererComponent = cellRenderer;
        colDef.cellRenderer = (params: { value: unknown; data: TData | undefined }) => {
          if (!params.data) return null;
          return <CellRendererComponent value={params.value} data={params.data} />;
        };
      }

      return colDef;
    });
  }, [columnDefs]);

  // Handle grid ready event
  const handleGridReady = useCallback(
    (event: GridReadyEvent<TData>) => {
      gridApiRef.current = event.api;

      if (autoSizeColumns) {
        event.api.autoSizeAllColumns();
      }

      onGridReady?.(event.api);
    },
    [autoSizeColumns, onGridReady]
  );

  // Handle selection change
  const handleSelectionChanged = useCallback(() => {
    if (gridApiRef.current && onSelectionChanged) {
      const selectedRows = gridApiRef.current.getSelectedRows();
      onSelectionChanged(selectedRows);
    }
  }, [onSelectionChanged]);

  // Handle cell click
  const handleCellClicked = useCallback(
    (event: CellClickedEvent<TData>) => {
      if (onCellClicked && event.data && event.colDef.field) {
        onCellClicked(event.data, event.colDef.field);
      }
    },
    [onCellClicked]
  );

  // Merge grid options
  const mergedGridOptions = useMemo(
    () => ({
      ...defaultGridOptions,
      ...gridOptions,
    }),
    [gridOptions]
  );

  // Compute container style
  const containerStyle = useMemo<React.CSSProperties>(
    () => ({
      ...containerBaseStyle,
      height: typeof height === 'number' ? `${height}px` : height,
    }),
    [height]
  );

  // Overlay components
  const loadingOverlayComponent = useMemo(
    () => () => <div style={overlayStyle}>Loading...</div>,
    []
  );

  const noRowsOverlayComponent = useMemo(
    () => () => <div style={overlayStyle}>{noRowsMessage}</div>,
    [noRowsMessage]
  );

  const containerClassName = [theme, className].filter(Boolean).join(' ');

  return (
    <div className={containerClassName} style={containerStyle}>
      <AgGridReact<TData>
        ref={gridRef}
        rowData={rowData}
        columnDefs={processedColumnDefs}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        suppressHorizontalScroll={suppressHorizontalScroll}
        onGridReady={handleGridReady}
        onSelectionChanged={handleSelectionChanged}
        onCellClicked={handleCellClicked}
        loading={loading}
        loadingOverlayComponent={loadingOverlayComponent}
        noRowsOverlayComponent={noRowsOverlayComponent}
        {...mergedGridOptions}
      />
    </div>
  );
}
