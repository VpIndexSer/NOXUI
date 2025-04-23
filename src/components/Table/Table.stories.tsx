import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Table } from './Table';
import type { TableColumn } from './Table';

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  status: 'active' | 'inactive';
}

const meta: Meta<typeof Table<User>> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

// Sample data
const users: User[] = Array.from({ length: 100 }, (_, index) => ({
  id: `${index + 1}`,
  name: `User ${index + 1}`,
  age: 20 + Math.floor(Math.random() * 40),
  email: `user${index + 1}@example.com`,
  status: Math.random() > 0.5 ? 'active' : 'inactive',
}));

const columns: TableColumn<User>[] = [
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Age',
    key: 'age',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Status',
    key: 'status',
    render: (value) => (
      <span
        style={{
          padding: '4px 8px',
          borderRadius: '4px',
          backgroundColor: value === 'active' ? '#52c41a' : '#ff4d4f',
          color: 'white',
        }}
      >
        {value}
      </span>
    ),
  },
];

// Template for stories
const Template: StoryFn<typeof Table<User>> = (args) => {
  return (
    <div style={{ width: '800px' }}>
      <Table<User> {...args} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  columns,
  dataSource: users.slice(0, 10),
};

// With pagination
export const WithPagination = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const total = users.length;

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  };

  return (
    <div style={{ width: '800px' }}>
      <Table
        columns={columns}
        dataSource={getCurrentPageData()}
        pagination={{
          current: currentPage,
          pageSize,
          total,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          pageSizeOptions: [10, 20, 50],
        }}
      />
    </div>
  );
};

// With row selection
export const WithRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);

  return (
    <div style={{ width: '800px' }}>
      <div style={{ marginBottom: '16px' }}>
        Selected rows: {selectedRowKeys.join(', ')}
      </div>
      <Table
        columns={columns}
        dataSource={users.slice(0, 10)}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    </div>
  );
};

// With infinite scroll
export const WithInfiniteScroll = () => {
  const [data, setData] = React.useState(users.slice(0, 20));
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  const loadMore = () => {
    if (loading) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const nextData = users.slice(data.length, data.length + 10);
      setData([...data, ...nextData]);
      setLoading(false);
      if (data.length + nextData.length >= users.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div style={{ width: '800px' }}>
      <Table
        columns={columns}
        dataSource={data}
        height="400px"
        infiniteScroll={{
          loading,
          hasMore,
          onLoadMore: loadMore,
          loadingIndicator: <div style={{ textAlign: 'center', padding: '16px' }}>Loading...</div>,
        }}
      />
    </div>
  );
};

// Complex example with all features
export const ComplexTable = () => {
  const [data, setData] = React.useState(users.slice(0, 20));
  const [loading, setLoading] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<string[]>([]);
  const [searchText, setSearchText] = React.useState('');

  const filteredData = data.filter(user =>
    Object.values(user).some(value =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleDelete = () => {
    setData(data.filter(item => !selectedRowKeys.includes(item.id)));
    setSelectedRowKeys([]);
  };

  return (
    <div style={{ width: '800px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{
            padding: '8px',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            width: '200px',
          }}
        />
        <button
          onClick={handleDelete}
          disabled={selectedRowKeys.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: selectedRowKeys.length ? '#ff4d4f' : '#f5f5f5',
            color: selectedRowKeys.length ? 'white' : '#00000040',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedRowKeys.length ? 'pointer' : 'not-allowed',
          }}
        >
          Delete Selected
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        pagination={{
          current: 1,
          pageSize: 10,
          total: filteredData.length,
          onChange: () => {},
        }}
      />
    </div>
  );
}; 