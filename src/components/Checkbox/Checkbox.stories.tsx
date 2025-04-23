import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
    indeterminate: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'large'],
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Checkbox',
};

export const Checked = Template.bind({});
Checked.args = {
  label: 'Checked Checkbox',
  checked: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Checkbox',
  disabled: true,
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  label: 'Disabled Checked Checkbox',
  disabled: true,
  checked: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  label: 'Indeterminate Checkbox',
  indeterminate: true,
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small Checkbox',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large Checkbox',
  size: 'large',
};

// Complex example with checkbox group
export const CheckboxGroup = () => {
  const [selectedFruits, setSelectedFruits] = React.useState<string[]>([]);
  const fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
  
  const handleChange = (fruit: string) => {
    setSelectedFruits(prev => {
      if (prev.includes(fruit)) {
        return prev.filter(f => f !== fruit);
      }
      return [...prev, fruit];
    });
  };

  const selectAll = () => {
    if (selectedFruits.length === fruits.length) {
      setSelectedFruits([]);
    } else {
      setSelectedFruits([...fruits]);
    }
  };

  const isAllSelected = selectedFruits.length === fruits.length;
  const isIndeterminate = selectedFruits.length > 0 && selectedFruits.length < fruits.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Checkbox
        label="Select All Fruits"
        checked={isAllSelected}
        indeterminate={isIndeterminate}
        onChange={() => selectAll()}
      />
      <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {fruits.map(fruit => (
          <Checkbox
            key={fruit}
            label={fruit}
            checked={selectedFruits.includes(fruit)}
            onChange={() => handleChange(fruit)}
          />
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        Selected fruits: {selectedFruits.join(', ') || 'None'}
      </div>
    </div>
  );
}; 