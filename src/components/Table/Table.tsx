import React, { useEffect, useRef, useState } from 'react';
import './Table.css';

export interface TableColumn<T> {
  title: string;
  key: keyof T;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  dataSource: T[];
  className?: string;
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
  };
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
    pageSizeOptions?: number[];
  };
  infiniteScroll?: {
    loading?: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    loadingIndicator?: React.ReactNode;
  };
  height?: string | number;
}

export function Table<T extends Record<string, any>>({
  columns,
  dataSource,
  className = '',
  rowSelection,
  pagination,
  infiniteScroll,
  height = '400px',
}: TableProps<T>) {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState(pagination?.pageSize || 10);

  const handleScroll = () => {
    if (!tableWrapperRef.current || !infiniteScroll) return;

    const { scrollTop, scrollHeight, clientHeight } = tableWrapperRef.current;
    const threshold = 50;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold;

    if (isNearBottom && !isNearBottom && infiniteScroll.hasMore && !infiniteScroll.loading) {
      setIsNearBottom(true);
      infiniteScroll.onLoadMore();
    } else {
      setIsNearBottom(false);
    }
  };

  useEffect(() => {
    const tableWrapper = tableWrapperRef.current;
    if (tableWrapper && infiniteScroll) {
      tableWrapper.addEventListener('scroll', handleScroll);
      return () => tableWrapper.removeEventListener('scroll', handleScroll);
    }
  }, [infiniteScroll]);

  const tableStyle = infiniteScroll ? { height, overflowY: 'auto' as const } : {};

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!rowSelection) return;
    
    if (e.target.checked) {
      const allIds = dataSource.map(item => String(item.id));
      rowSelection.onChange(allIds, dataSource);
    } else {
      rowSelection.onChange([], []);
    }
  };

  const handleSelectRow = (record: T, checked: boolean) => {
    if (!rowSelection) return;

    const id = String(record.id);
    let newSelectedKeys: string[];
    
    if (checked) {
      newSelectedKeys = [...rowSelection.selectedRowKeys, id];
    } else {
      newSelectedKeys = rowSelection.selectedRowKeys.filter(key => key !== id);
    }

    rowSelection.onChange(
      newSelectedKeys,
      dataSource.filter(item => newSelectedKeys.includes(String(item.id)))
    );
  };

  const renderPagination = () => {
    if (!pagination || infiniteScroll) return null;

    const totalPages = Math.ceil(pagination.total / pageSize);
    const currentPage = pagination.current;
    const pageSizeOptions = pagination.pageSizeOptions || [10, 20, 50, 100];

    let pageNumbers = [];
    if (totalPages <= 7) {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 4) {
        pageNumbers = [1, 2, 3, 4, 5, '...', totalPages];
      } else if (currentPage >= totalPages - 3) {
        pageNumbers = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return (
      <div className="table-pagination">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => pagination.onChange(currentPage - 1, pageSize)}
        >
          &lt;
        </button>
        
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            className={`pagination-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'ellipsis' : ''}`}
            disabled={page === '...'}
            onClick={() => typeof page === 'number' && pagination.onChange(page, pageSize)}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => pagination.onChange(currentPage + 1, pageSize)}
        >
          &gt;
        </button>

        <select
          className="page-size-select"
          value={pageSize}
          onChange={(e) => {
            const newPageSize = Number(e.target.value);
            setPageSize(newPageSize);
            pagination.onChange(1, newPageSize);
          }}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className={`custom-table-wrapper ${className}`} ref={tableWrapperRef} style={tableStyle}>
      <table className="custom-table">
        <thead>
          <tr>
            {rowSelection && (
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={
                    rowSelection.selectedRowKeys.length > 0 &&
                    rowSelection.selectedRowKeys.length === dataSource.length
                  }
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = 
                        rowSelection.selectedRowKeys.length > 0 &&
                        rowSelection.selectedRowKeys.length < dataSource.length;
                    }
                  }}
                  onChange={handleSelectAll}
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, rowIndex) => (
            <tr 
              key={rowIndex}
              className={rowSelection?.selectedRowKeys.includes(String(record.id)) ? 'selected-row' : ''}
            >
              {rowSelection && (
                <td className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={rowSelection.selectedRowKeys.includes(String(record.id))}
                    onChange={(e) => handleSelectRow(record, e.target.checked)}
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {column.render
                    ? column.render(record[column.key], record)
                    : record[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {infiniteScroll?.loading && (
        <div className="table-loading">
          {infiniteScroll.loadingIndicator || (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      )}
      
      {renderPagination()}
    </div>
  );
}

export default Table; 