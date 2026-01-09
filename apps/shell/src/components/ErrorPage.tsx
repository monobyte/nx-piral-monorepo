import * as React from 'react';
import { ComponentsState } from 'piral-core';
import { Alert, Button, Container, Stack, Text, Title } from '@mantine/core';
import styles from '../styles/ErrorPage.module.css';

export const ErrorPage: React.FC<ComponentsState['ErrorInfo']> = ({ type, error }) => {
  const getErrorMessage = () => {
    switch (type) {
      case 'loading':
        return 'Failed to load pilet. Please check your network connection.';
      case 'page':
        return 'The page you are looking for could not be found.';
      case 'not_found':
        return 'The requested resource does not exist.';
      case 'unknown':
      default:
        return 'An unexpected error occurred.';
    }
  };

  return (
    <Container size="sm" className={styles.container}>
      <Stack gap="lg" align="center">
        <div className={styles.icon}>
          <span role="img" aria-label="error">⚠️</span>
        </div>
        <Title order={2} ta="center">Something went wrong</Title>
        <Text c="dimmed" ta="center">{getErrorMessage()}</Text>

        {error && (
          <Alert color="red" title="Error Details" className={styles.alert}>
            <Text size="sm" style={{ fontFamily: 'monospace' }}>
              {error.message || String(error)}
            </Text>
          </Alert>
        )}

        <Button onClick={() => window.location.reload()}>
          Reload Page
        </Button>
      </Stack>
    </Container>
  );
};
