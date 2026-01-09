import * as React from 'react';
import { Center, Loader as MantineLoader, Stack, Text } from '@mantine/core';
import styles from '../styles/Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <Center className={styles.container}>
      <Stack gap="md" align="center">
        <MantineLoader size="lg" type="dots" />
        <Text size="sm" c="dimmed">Loading...</Text>
      </Stack>
    </Center>
  );
};
