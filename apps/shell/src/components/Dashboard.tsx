import * as React from 'react';
import { Card, Container, Grid, Text, Title, ThemeIcon, Stack } from '@mantine/core';
import styles from '../styles/Dashboard.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
    <Stack gap="sm">
      <ThemeIcon size="xl" radius="md" variant="light">
        <span role="img" aria-label={title}>{icon}</span>
      </ThemeIcon>
      <Text fw={500} size="lg">{title}</Text>
      <Text size="sm" c="dimmed">{description}</Text>
    </Stack>
  </Card>
);

export const Dashboard: React.FC = () => {
  return (
    <Container size="lg" className={styles.container}>
      <Stack gap="xl">
        <div className={styles.hero}>
          <Title order={1} className={styles.title}>
            Welcome to Piral Monorepo
          </Title>
          <Text size="lg" c="dimmed" maw={600}>
            A production-ready Nx-managed, Package-Based Monorepo using TypeScript,
            React, and the Piral micro-frontend framework.
          </Text>
        </div>

        <Title order={2} size="h3">Features</Title>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="🎯"
              title="Micro-Frontends"
              description="Independent pilets that can be developed, deployed, and scaled separately."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="📦"
              title="Nx Monorepo"
              description="Package-based monorepo with smart caching and dependency graph."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="⚡"
              title="Rspack Bundler"
              description="Lightning-fast builds with Rust-based Rspack bundler."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="🎨"
              title="Mantine UI"
              description="Modern React component library with dark mode support."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="📊"
              title="AG-Grid"
              description="Enterprise-grade data grid for complex data displays."
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <FeatureCard
              icon="🔗"
              title="Shared Dependencies"
              description="Import maps for efficient dependency sharing across pilets."
            />
          </Grid.Col>
        </Grid>

        <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.infoCard}>
          <Stack gap="sm">
            <Title order={3}>Getting Started</Title>
            <Text size="sm">
              Navigate using the sidebar to explore the micro-frontends:
            </Text>
            <ul className={styles.list}>
              <li><strong>MFE1</strong> - Demonstrates Mantine UI components</li>
              <li><strong>MFE2</strong> - Showcases AG-Grid integration</li>
            </ul>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
