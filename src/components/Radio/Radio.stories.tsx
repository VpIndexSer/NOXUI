import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Radio from './Radio';
import './Radio.css';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Basic radio group
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Radio
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onChange={(value) => setValue(value)}
      />
    );
  },
};

// Radio group with labels
export const WithLabels: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Radio
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
        ]}
        value={value}
        onChange={(value) => setValue(value)}
        label="Select a fruit"
      />
    );
  },
};

// Vertical layout
export const VerticalLayout: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Radio
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onChange={(value) => setValue(value)}
        direction="vertical"
      />
    );
  },
};

// With disabled options
export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Radio
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2', disabled: true },
          { label: 'Option 3', value: '3' },
        ]}
        value={value}
        onChange={(value) => setValue(value)}
      />
    );
  },
};

// Radio group in a form context
export const InForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      gender: '',
      newsletter: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: { target: { checked: boolean } }) => {
      setFormData(prev => ({ ...prev, newsletter: e.target.checked }));
    };

    return (
      <>
      <form onSubmit={(e) => { e.preventDefault(); alert(JSON.stringify(formData)); }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ marginLeft: '0.5rem' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <Radio
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
              { label: 'Other', value: 'other' },
            ]}
            value={formData.gender}
            onChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
            label="Gender"
            direction="vertical"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={handleCheckboxChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
      <div style={{ marginTop: '8px' }}>
      <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
    </>
    );
  },
}; 