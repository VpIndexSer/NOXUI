import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'info', 'warning', 'dark', 'neon'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    backgroundColor: {
      control: 'color',
    },
    borderRadius: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true,
  },
};

export const CustomStyle: Story = {
  args: {
    label: 'Custom Style',
    backgroundColor: '#9c27b0',
    borderRadius: '20px',
  },
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme',
    theme: 'dark',
    variant: 'primary',
  },
}; 