import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
    },
    label: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'text',
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<typeof Input> = (args) => {
  const [value, setValue] = React.useState('');
  return <Input {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  type: 'text',
};

export const WithPassword = Template.bind({});
WithPassword.args = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
};

export const WithEmail = Template.bind({});
WithEmail.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  type: 'email',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  error: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'This input is disabled',
  disabled: true,
};

// Complex example with form validation
export const FormValidation = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <Input
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        error={errors.email}
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        error={errors.password}
      />
      <button 
        onClick={handleSubmit}
        style={{
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </div>
  );
}; 