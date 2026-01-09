import * as React from 'react';
import type { PiletApi } from '@proj/shell';
import { DataGridPage } from './components/DataGridPage';

// Import AG-Grid styles
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

/**
 * MFE2 Pilet - Demonstrates AG-Grid Integration
 *
 * This pilet registers a page with AG-Grid displaying
 * hardcoded dummy data using the shared @proj/grid package.
 */
export function setup(api: PiletApi): void {
  // Register the main page for this pilet
  api.registerPage('/mfe2', DataGridPage);

  // Register navigation menu item
  api.registerMenu(() => (
    <a href="/mfe2" style={{ padding: '8px 12px', display: 'block' }}>
      MFE2 - Data Grid
    </a>
  ));

  // Register a tile for the dashboard (if dashboard extension is available)
  api.registerTile(() => (
    <div style={{ padding: '16px' }}>
      <h3>MFE2</h3>
      <p>AG-Grid Data Table Demo</p>
    </div>
  ), {
    initialColumns: 2,
    initialRows: 1,
  });
}
