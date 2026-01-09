import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Group,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import styles from '../styles/MantineFormsPage.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number | '';
  country: string | null;
  gender: string;
  bio: string;
  notifications: boolean;
  newsletter: boolean;
  theme: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: '',
  country: null,
  gender: '',
  bio: '',
  notifications: false,
  newsletter: true,
  theme: 'light',
};

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
];

const frameworkOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

export const MantineFormsPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form submitted:', formData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setSubmitted(false);
  };

  return (
    <Container size="lg" className={styles.container}>
      <Stack gap="xl">
        <div className={styles.header}>
          <Title order={1}>MFE1 - Mantine Forms</Title>
          <Text c="dimmed" size="lg">
            Demonstrating various Mantine UI form controls
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <Grid gutter="xl">
            {/* Personal Information Card */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Personal Information</Title>

                  <TextInput
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleChange('firstName', e.currentTarget.value)
                    }
                    required
                  />

                  <TextInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleChange('lastName', e.currentTarget.value)
                    }
                    required
                  />

                  <TextInput
                    label="Email"
                    placeholder="your@email.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange('email', e.currentTarget.value)
                    }
                    required
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      handleChange('password', e.currentTarget.value)
                    }
                    required
                  />

                  <NumberInput
                    label="Age"
                    placeholder="Enter your age"
                    min={0}
                    max={150}
                    value={formData.age}
                    onChange={(value) =>
                      handleChange('age', value as number | '')
                    }
                  />
                </Stack>
              </Card>
            </Grid.Col>

            {/* Preferences Card */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Preferences</Title>

                  <Select
                    label="Country"
                    placeholder="Select your country"
                    data={countryOptions}
                    value={formData.country}
                    onChange={(value) => handleChange('country', value)}
                    searchable
                    clearable
                  />

                  <NativeSelect
                    label="Favorite Framework"
                    data={['Select...', ...frameworkOptions.map((f) => f.label)]}
                  />

                  <Radio.Group
                    label="Gender"
                    value={formData.gender}
                    onChange={(value) => handleChange('gender', value)}
                  >
                    <Group mt="xs">
                      <Radio value="male" label="Male" />
                      <Radio value="female" label="Female" />
                      <Radio value="other" label="Other" />
                    </Group>
                  </Radio.Group>

                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    minRows={3}
                    maxRows={5}
                    value={formData.bio}
                    onChange={(e) =>
                      handleChange('bio', e.currentTarget.value)
                    }
                  />

                  <Switch
                    label="Enable notifications"
                    checked={formData.notifications}
                    onChange={(e) =>
                      handleChange('notifications', e.currentTarget.checked)
                    }
                  />

                  <Checkbox
                    label="Subscribe to newsletter"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      handleChange('newsletter', e.currentTarget.checked)
                    }
                  />
                </Stack>
              </Card>
            </Grid.Col>

            {/* Actions */}
            <Grid.Col span={12}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" align="center">
                  <Group>
                    <Button type="submit" size="md">
                      Submit Form
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </Group>

                  {submitted && (
                    <Text c="green" fw={500}>
                      Form submitted successfully! Check console for data.
                    </Text>
                  )}
                </Group>
              </Card>
            </Grid.Col>

            {/* Form Data Preview */}
            <Grid.Col span={12}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={4}>Form Data Preview</Title>
                  <pre className={styles.preview}>
                    {JSON.stringify(formData, null, 2)}
                  </pre>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </Container>
  );
};
