import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Notification from './Notification';

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    message: {
      control: 'text',
    },
    onClose: {
      action: 'closed',
    },
    animation: {
      control: 'select',
      options: ['fade', 'pop', 'slide'],
    },
    duration: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

// Template for interactive stories
const NotificationTemplate: React.FC<React.ComponentProps<typeof Notification>> = (args) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) {
    return (
      <button 
        onClick={() => setIsVisible(true)}
        style={{ padding: '8px 16px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Show Notification
      </button>
    );
  }
  
  return (
    <Notification
      {...args}
      onClose={() => setIsVisible(false)}
    />
  );
};

// Success notification
export const Success: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="success"
      message="Operation completed successfully!"
      duration={3000}
    />
  ),
};

// Info notification
export const Info: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="info"
      message="Here is some information for you."
      duration={3000}
    />
  ),
};

// Warning notification
export const Warning: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="warning"
      message="Please be careful with this action."
      duration={3000}
    />
  ),
};

// Error notification
export const Error: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="error"
      message="An error occurred during the operation."
      duration={3000}
    />
  ),
};

// Different animations
export const FadeAnimation: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="info"
      message="This notification uses fade animation."
      animation="fade"
      duration={3000}
    />
  ),
};

export const PopAnimation: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="info"
      message="This notification uses pop animation."
      animation="pop"
      duration={3000}
    />
  ),
};

export const SlideAnimation: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="info"
      message="This notification uses slide animation."
      animation="slide"
      duration={3000}
    />
  ),
};

// Long message example
export const LongMessage: Story = {
  render: (args) => (
    <NotificationTemplate
      {...args}
      type="info"
      message="This is a very long notification message that demonstrates how the component handles longer text content. It should wrap properly and maintain its styling."
      duration={3000}
    />
  ),
};

// Multiple notifications example
export const MultipleNotifications: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, type: 'success', message: 'Success notification' },
      { id: 2, type: 'info', message: 'Info notification' },
      { id: 3, type: 'warning', message: 'Warning notification' },
      { id: 4, type: 'error', message: 'Error notification' },
    ]);
    
    const handleClose = (id: number) => {
      setNotifications(notifications.filter(notification => notification.id !== id));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            type={notification.type as 'success' | 'info' | 'warning' | 'error'}
            message={notification.message}
            onClose={() => handleClose(notification.id)}
            duration={3000}
          />
        ))}
      </div>
    );
  },
}; 