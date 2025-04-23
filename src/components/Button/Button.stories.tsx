import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
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

// Template for stories
const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
  variant: 'secondary',
};

export const Danger = Template.bind({});
Danger.args = {
  label: 'Danger Button',
  variant: 'danger',
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Button',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Button',
  disabled: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  label: 'Custom Style',
  backgroundColor: '#9c27b0',
  borderRadius: '20px',
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  label: 'Dark Theme',
  theme: 'dark',
  variant: 'primary',
};

// Example of a more complex story using JSX directly
export const ButtonGroup = () => {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Danger" variant="danger" />
      <Button label="Info" variant="info" />
      <Button label="Warning" variant="warning" />
      <Button label="Dark" variant="dark" />
      <Button label="Neon" variant="neon" />
    </div>
  );
};

// Interactive example with state
export const InteractiveExample = () => {
  const [count, setCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setCount(prev => prev + 1);
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      <div>Count: {count}</div>
      <Button
        label={loading ? 'Loading...' : 'Click me!'}
        loading={loading}
        onClick={handleClick}
        variant="primary"
      />
    </div>
  );
}; 