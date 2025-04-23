import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Textarea from './TextArea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
    showCount: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    autoSize: {
      control: 'boolean',
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<typeof Textarea> = (args) => {
  const [value, setValue] = React.useState('');
  return (
    <div style={{ width: '300px' }}>
      <Textarea {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Basic Textarea',
  placeholder: 'Enter your text here',
};

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = {
  label: 'With Character Count',
  placeholder: 'Limited to 100 characters',
  maxLength: 100,
  showCount: true,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'With Error',
  placeholder: 'Enter your text here',
  error: 'This field is required',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Textarea',
  placeholder: 'This textarea is disabled',
  disabled: true,
};

export const AutoSize = Template.bind({});
AutoSize.args = {
  label: 'Auto Size Textarea',
  placeholder: 'This textarea will auto-resize',
  autoSize: true,
};

// Complex example with form validation
export const FormValidation = () => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (newValue.length < 10) {
      setError('Text must be at least 10 characters long');
    } else {
      setError('');
    }
  };

  return (
    <div style={{ width: '300px' }}>
      <Textarea
        label="Feedback"
        placeholder="Please provide your feedback (min 10 characters)"
        value={value}
        onChange={handleChange}
        error={error}
        showCount
        maxLength={200}
      />
      {!error && value.length >= 10 && (
        <div style={{ color: '#52c41a', marginTop: '8px', fontSize: '14px' }}>
          Valid feedback!
        </div>
      )}
    </div>
  );
};

// Complex example with multiple textareas
export const MultipleTextareas = () => {
  const [values, setValues] = React.useState({
    title: '',
    description: '',
    notes: '',
  });

  const handleChange = (field: keyof typeof values) => (value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Textarea
        label="Title"
        placeholder="Enter title"
        value={values.title}
        onChange={handleChange('title')}
        rows={2}
      />
      <Textarea
        label="Description"
        placeholder="Enter description"
        value={values.description}
        onChange={handleChange('description')}
        rows={4}
        showCount
        maxLength={200}
      />
      <Textarea
        label="Additional Notes"
        placeholder="Enter notes"
        value={values.notes}
        onChange={handleChange('notes')}
        autoSize={{ minRows: 2, maxRows: 6 }}
      />
      <div style={{ marginTop: '8px' }}>
        <pre style={{ background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
}; 