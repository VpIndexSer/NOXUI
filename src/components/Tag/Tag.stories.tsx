import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'color',
    },
    closable: {
      control: 'boolean',
    },
  },
};

export default meta;

// Template for stories
const Template: StoryFn<typeof Tag> = (args) => <Tag {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Basic Tag',
};

export const Colored = Template.bind({});
Colored.args = {
  children: 'Colored Tag',
  color: '#1890ff',
};

export const Closable = Template.bind({});
Closable.args = {
  children: 'Closable Tag',
  closable: true,
  onClose: () => alert('Tag closed'),
};

// Multiple tags example
export const TagGroup = () => {
  const [tags, setTags] = React.useState([
    { id: 1, text: 'Tag 1', color: '#f50' },
    { id: 2, text: 'Tag 2', color: '#2db7f5' },
    { id: 3, text: 'Tag 3', color: '#87d068' },
    { id: 4, text: 'Tag 4', color: '#108ee9' },
  ]);

  const handleClose = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          color={tag.color}
          closable
          onClose={() => handleClose(tag.id)}
        >
          {tag.text}
        </Tag>
      ))}
    </div>
  );
};

// Dynamic tags example
export const DynamicTags = () => {
  const [tags, setTags] = React.useState(['React', 'TypeScript', 'Storybook']);
  const [inputVisible, setInputVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleClose = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputValue('');
    setInputVisible(false);
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      {tags.map(tag => (
        <Tag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {inputVisible ? (
        <input
          type="text"
          size={15}
          style={{
            padding: '4px 8px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
          }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleInputConfirm}
          onKeyPress={e => e.key === 'Enter' && handleInputConfirm()}
          autoFocus
        />
      ) : (
        <button
          onClick={() => setInputVisible(true)}
          style={{
            padding: '4px 8px',
            fontSize: '14px',
            border: '1px dashed #d9d9d9',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          + New Tag
        </button>
      )}
    </div>
  );
}; 