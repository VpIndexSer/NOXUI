import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import './Icon.css';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['close'],
      description: 'The name of the icon to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the icon',
    },
    style: {
      control: 'object',
      description: 'Inline styles to apply to the icon',
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the icon is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Basic icon example
export const Basic: Story = {
  args: {
    name: 'close',
  },
};

// Icon with custom size
export const CustomSize: Story = {
  args: {
    name: 'close',
    style: {
      fontSize: '24px',
    },
  },
};

// Icon with custom color
export const CustomColor: Story = {
  args: {
    name: 'close',
    style: {
      color: 'red',
    },
  },
};

// Icon with click handler
export const Clickable: Story = {
  args: {
    name: 'close',
    onClick: () => alert('Icon clicked!'),
    style: {
      cursor: 'pointer',
    },
  },
};

// Icon with additional class
export const WithAdditionalClass: Story = {
  args: {
    name: 'close',
    className: 'custom-icon',
  },
};

// Icon with hover effect
export const WithHoverEffect: Story = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <style>
        {`
          .hover-icon:hover {
            color: blue;
            transform: scale(1.2);
            transition: all 0.3s ease;
          }
        `}
      </style>
      <Icon {...args} className="hover-icon" />
    </div>
  ),
  args: {
    name: 'close',
  },
};

// Icon in a button context
export const InButton: Story = {
  render: (args) => (
    <button 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        background: 'white',
        cursor: 'pointer'
      }}
    >
      <Icon {...args} />
      <span>Close</span>
    </button>
  ),
  args: {
    name: 'close',
  },
};

// Icon with animation
export const WithAnimation: Story = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinning-icon {
            animation: spin 2s linear infinite;
          }
        `}
      </style>
      <Icon {...args} className="spinning-icon" />
    </div>
  ),
  args: {
    name: 'close',
  },
}; 