import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInstance, Piral, createStandardApi } from 'piral-core';
import { MantineProvider } from '@mantine/core';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { ErrorPage } from './components/ErrorPage';
import { Loader } from './components/Loader';

import '@mantine/core/styles.css';
import './styles/global.module.css';

// Local development feed configuration
const feedUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/api/v1/pilet'
  : '/api/v1/pilet';

// Create Piral instance with configuration
const instance = createInstance({
  state: {
    components: {
      Layout,
      ErrorInfo: ErrorPage,
      LoadingIndicator: Loader,
    },
    routes: {
      '/': Dashboard,
    },
    errorComponents: {},
  },
  plugins: [...createStandardApi()],
  requestPilets: async () => {
    // In development, pilets are loaded via debug API
    // In production, fetch from your pilet feed
    if (process.env.NODE_ENV === 'development') {
      // Development mode - pilets are injected via piral-cli debug
      return [];
    }

    try {
      const response = await fetch(feedUrl);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.warn('Failed to fetch pilets:', error);
      return [];
    }
  },
});

// Render the application
const container = document.getElementById('app');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <MantineProvider defaultColorScheme="light">
        <Piral instance={instance} />
      </MantineProvider>
    </React.StrictMode>
  );
}
