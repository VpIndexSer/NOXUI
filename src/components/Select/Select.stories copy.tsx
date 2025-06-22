import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Select from './Select';
import type { Option, OptionGroup } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'middle', 'small'],
    },
    mode: {
      control: 'select',
      options: [undefined, 'multiple', 'tags'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    showSearch: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
  },
};

export default meta;

const simpleOptions: Option[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
  { label: 'Option 5', value: '5' },
];

const groupedOptions: (Option | OptionGroup)[] = [
  {
    label: 'Fruits',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { label: 'Carrot', value: 'carrot' },
      { label: 'Broccoli', value: 'broccoli' },
      { label: 'Spinach', value: 'spinach' },
    ],
  },
];

// Template for stories
const Template: StoryFn<typeof Select> = (args) => {
  const [value, setValue] = React.useState<string | string[]>(args.defaultValue || '');
  return (
    <div style={{ width: '300px' }}>
      <Select {...args} value={value} onChange={(val) => setValue(val)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Basic Select',
  options: simpleOptions,
  placeholder: 'Select an option',
};

export const WithGroups = Template.bind({});
WithGroups.args = {
  label: 'Grouped Select',
  options: groupedOptions,
  placeholder: 'Select food',
};

export const Multiple = Template.bind({});
Multiple.args = {
  label: 'Multiple Select',
  options: simpleOptions,
  mode: 'multiple',
  placeholder: 'Select multiple options',
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  label: 'Searchable Select',
  options: simpleOptions,
  showSearch: true,
  placeholder: 'Search and select',
};

export const WithClear = Template.bind({});
WithClear.args = {
  label: 'Clearable Select',
  options: simpleOptions,
  allowClear: true,
  placeholder: 'Select with clear button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Select',
  options: simpleOptions,
  disabled: true,
  placeholder: 'Disabled select',
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading Select',
  options: simpleOptions,
  loading: true,
  placeholder: 'Loading...',
};

// Complex example with async loading
export const AsyncSelect = () => {
  const [options, setOptions] = React.useState<Option[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState<string>('');
  const [searchText, setSearchText] = React.useState('');

  const simulateAsyncSearch = (text: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = simpleOptions.filter(opt => 
        opt.label.toLowerCase().includes(text.toLowerCase())
      );
      setOptions(filtered);
      setLoading(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (searchText) {
      simulateAsyncSearch(searchText);
    } else {
      setOptions([]);
    }
  }, [searchText]);

  return (
    <div style={{ width: '300px' }}>
      <Select
        label="Async Search Select"
        value={value}
        onChange={(val) => setValue(val as string)}
        options={options}
        placeholder="Type to search..."
        showSearch
        loading={loading}
        onSearch={setSearchText}
        notFoundContent={loading ? 'Loading...' : (searchText ? 'No matches found' : 'Type to search')}
      />
      <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
        Try typing "Option" to see results
      </div>
    </div>
  );
}; 