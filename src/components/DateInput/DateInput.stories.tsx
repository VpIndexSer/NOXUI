import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DateInput from './DateInput';

const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<typeof DateInput> = (args) => {
  const [value, setValue] = React.useState('');
  return <DateInput {...args} value={value} onChange={setValue} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Select Date',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  label: 'Select Date',
  value: '2024-03-15',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Date Input',
  disabled: true,
};

// Complex example with date range
export const DateRange = () => {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [error, setError] = React.useState('');

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setError('Start date cannot be after end date');
    } else {
      setError('');
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setError('End date cannot be before start date');
    } else {
      setError('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <DateInput
        label="Start Date"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <DateInput
        label="End Date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: '14px' }}>
          {error}
        </div>
      )}
      {startDate && endDate && !error && (
        <div style={{ color: '#52c41a', fontSize: '14px' }}>
          Selected range: {startDate} to {endDate}
        </div>
      )}
    </div>
  );
};

// Complex example with date validation
export const DateValidation = () => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [error, setError] = React.useState('');

  const minDate = '2024-01-01';
  const maxDate = '2024-12-31';

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    
    if (date < minDate) {
      setError('Date cannot be before January 1, 2024');
    } else if (date > maxDate) {
      setError('Date cannot be after December 31, 2024');
    } else {
      setError('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <DateInput
        label="Select Date (2024 only)"
        value={selectedDate}
        onChange={handleDateChange}
      />
      {error && (
        <div style={{ color: '#ff4d4f', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <div style={{ color: '#666', fontSize: '14px' }}>
        Valid date range: {minDate} to {maxDate}
      </div>
    </div>
  );
}; 