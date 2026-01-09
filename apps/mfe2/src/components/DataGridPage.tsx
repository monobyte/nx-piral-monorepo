import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import {
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
  Badge,
} from '@mantine/core';
import { DataGrid, type GridColumn } from '@proj/grid';
import styles from '../styles/DataGridPage.module.css';

// Types for our data
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'active' | 'on-leave' | 'terminated';
  performance: number;
}

// Hardcoded dummy data
const dummyEmployees: Employee[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 95000,
    startDate: '2020-03-15',
    status: 'active',
    performance: 92,
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    salary: 85000,
    startDate: '2019-07-22',
    status: 'active',
    performance: 88,
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Williams',
    email: 'michael.williams@company.com',
    department: 'Engineering',
    position: 'Tech Lead',
    salary: 120000,
    startDate: '2018-01-10',
    status: 'active',
    performance: 95,
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@company.com',
    department: 'HR',
    position: 'HR Specialist',
    salary: 65000,
    startDate: '2021-09-01',
    status: 'on-leave',
    performance: 78,
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Jones',
    email: 'david.jones@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    salary: 55000,
    startDate: '2022-02-14',
    status: 'active',
    performance: 85,
  },
  {
    id: 6,
    firstName: 'Jessica',
    lastName: 'Garcia',
    email: 'jessica.garcia@company.com',
    department: 'Engineering',
    position: 'Junior Developer',
    salary: 65000,
    startDate: '2023-06-20',
    status: 'active',
    performance: 82,
  },
  {
    id: 7,
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.martinez@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    salary: 75000,
    startDate: '2020-11-30',
    status: 'active',
    performance: 90,
  },
  {
    id: 8,
    firstName: 'Amanda',
    lastName: 'Rodriguez',
    email: 'amanda.rodriguez@company.com',
    department: 'Marketing',
    position: 'Content Writer',
    salary: 55000,
    startDate: '2022-08-05',
    status: 'terminated',
    performance: 65,
  },
  {
    id: 9,
    firstName: 'Christopher',
    lastName: 'Lee',
    email: 'christopher.lee@company.com',
    department: 'Engineering',
    position: 'DevOps Engineer',
    salary: 105000,
    startDate: '2019-04-18',
    status: 'active',
    performance: 94,
  },
  {
    id: 10,
    firstName: 'Lisa',
    lastName: 'Walker',
    email: 'lisa.walker@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    salary: 90000,
    startDate: '2017-12-01',
    status: 'active',
    performance: 91,
  },
  {
    id: 11,
    firstName: 'Daniel',
    lastName: 'Hall',
    email: 'daniel.hall@company.com',
    department: 'Engineering',
    position: 'QA Engineer',
    salary: 72000,
    startDate: '2021-03-22',
    status: 'active',
    performance: 87,
  },
  {
    id: 12,
    firstName: 'Michelle',
    lastName: 'Allen',
    email: 'michelle.allen@company.com',
    department: 'HR',
    position: 'HR Manager',
    salary: 82000,
    startDate: '2018-09-15',
    status: 'on-leave',
    performance: 89,
  },
];

// Status cell renderer
const StatusRenderer: React.FC<{ value: string }> = ({ value }) => {
  const colorMap: Record<string, string> = {
    active: 'green',
    'on-leave': 'yellow',
    terminated: 'red',
  };

  return (
    <Badge color={colorMap[value] || 'gray'} variant="light">
      {value}
    </Badge>
  );
};

// Performance cell renderer
const PerformanceRenderer: React.FC<{ value: number }> = ({ value }) => {
  let color = 'red';
  if (value >= 90) color = 'green';
  else if (value >= 75) color = 'blue';
  else if (value >= 60) color = 'yellow';

  return (
    <Badge color={color} variant="filled">
      {value}%
    </Badge>
  );
};

export const DataGridPage: React.FC = () => {
  const [rowData] = useState<Employee[]>(dummyEmployees);
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  // Column definitions
  const columnDefs: GridColumn<Employee>[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 70,
        sortable: true,
        filter: true,
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        width: 120,
        sortable: true,
        filter: true,
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        width: 120,
        sortable: true,
        filter: true,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 220,
        sortable: true,
        filter: true,
      },
      {
        field: 'department',
        headerName: 'Department',
        width: 130,
        sortable: true,
        filter: true,
      },
      {
        field: 'position',
        headerName: 'Position',
        width: 160,
        sortable: true,
        filter: true,
      },
      {
        field: 'salary',
        headerName: 'Salary',
        width: 110,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: (params) =>
          params.value
            ? `$${params.value.toLocaleString()}`
            : '',
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        width: 120,
        sortable: true,
        filter: true,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        sortable: true,
        filter: true,
        cellRenderer: StatusRenderer,
      },
      {
        field: 'performance',
        headerName: 'Performance',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        cellRenderer: PerformanceRenderer,
      },
    ],
    []
  );

  const handleSelectionChanged = useCallback((rows: Employee[]) => {
    setSelectedRows(rows);
  }, []);

  const handleExportCsv = useCallback(() => {
    // In a real app, this would trigger CSV export via AG-Grid API
    console.log('Export to CSV requested');
  }, []);

  return (
    <Container size="xl" className={styles.container}>
      <Stack gap="xl">
        <div className={styles.header}>
          <Title order={1}>MFE2 - Data Grid</Title>
          <Text c="dimmed" size="lg">
            Demonstrating AG-Grid with the shared @proj/grid package
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <div>
                <Title order={3}>Employee Directory</Title>
                <Text size="sm" c="dimmed">
                  {rowData.length} employees total
                </Text>
              </div>
              <Group>
                {selectedRows.length > 0 && (
                  <Text size="sm" c="dimmed">
                    {selectedRows.length} selected
                  </Text>
                )}
                <Button variant="outline" size="sm" onClick={handleExportCsv}>
                  Export CSV
                </Button>
              </Group>
            </Group>

            <div className={styles.gridWrapper}>
              <DataGrid<Employee>
                rowData={rowData}
                columnDefs={columnDefs}
                onSelectionChanged={handleSelectionChanged}
                height={500}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </Stack>
        </Card>

        {selectedRows.length > 0 && (
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              <Title order={4}>Selected Employee Details</Title>
              <pre className={styles.preview}>
                {JSON.stringify(selectedRows, null, 2)}
              </pre>
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
};
