import * as React from 'react';
import { ComponentsState, ExtensionSlot, SwitchErrorInfo } from 'piral-core';
import { AppShell, Burger, Group, NavLink, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/Layout.module.css';

export const Layout: React.FC<ComponentsState['Layout']> = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className={styles.header}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} className={styles.logo}>
              Piral Monorepo
            </Title>
          </Group>
          <Text size="sm" c="dimmed">
            Nx + Piral + Mantine
          </Text>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" className={styles.navbar}>
        <NavLink
          component={Link}
          to="/"
          label="Dashboard"
          active={location.pathname === '/'}
          className={styles.navLink}
        />
        <ExtensionSlot name="menu-items" />
        <ExtensionSlot name="notifications" />
      </AppShell.Navbar>

      <AppShell.Main className={styles.main}>
        <SwitchErrorInfo>{children}</SwitchErrorInfo>
      </AppShell.Main>
    </AppShell>
  );
};
