import * as React from 'react';
import type { PiletApi } from '@proj/shell';
import { MantineFormsPage } from './components/MantineFormsPage';

/**
 * MFE1 Pilet - Demonstrates Mantine UI Components
 *
 * This pilet registers a page with various Mantine form controls
 * including Button, TextInput, Select, and more.
 */
export function setup(api: PiletApi): void {
  // Register the main page for this pilet
  api.registerPage('/mfe1', MantineFormsPage);

  // Register navigation menu item
  api.registerMenu(() => (
    <a href="/mfe1" style={{ padding: '8px 12px', display: 'block' }}>
      MFE1 - Forms
    </a>
  ));

  // Register a tile for the dashboard (if dashboard extension is available)
  api.registerTile(() => (
    <div style={{ padding: '16px' }}>
      <h3>MFE1</h3>
      <p>Mantine UI Form Components Demo</p>
    </div>
  ), {
    initialColumns: 2,
    initialRows: 1,
  });
}
