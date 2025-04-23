import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Row, Col } from './index';

const meta: Meta<typeof Row> = {
  title: 'Components/Grid',
  component: Row,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    gutter: {
      control: 'number',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Row>;

// Basic grid example
export const Basic: Story = {
  render: () => (
    <Row>
      <Col span={12}>
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
          Col span={12}
        </div>
      </Col>
      <Col span={12}>
        <div style={{ background: '#e0e0e0', padding: '20px', textAlign: 'center' }}>
          Col span={12}
        </div>
      </Col>
    </Row>
  ),
};

// Grid with gutter
export const WithGutter: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={8}>
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
          Col span={8}
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#e0e0e0', padding: '20px', textAlign: 'center' }}>
          Col span={8}
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#d0d0d0', padding: '20px', textAlign: 'center' }}>
          Col span={8}
        </div>
      </Col>
    </Row>
  ),
};

// Nested grid
export const NestedGrid: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={16}>
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
          Col span={16}
          <Row gutter={16}>
            <Col span={12}>
              <div style={{ background: '#e0e0e0', padding: '20px', margin: '10px 0', textAlign: 'center' }}>
                Nested Col span={12}
              </div>
            </Col>
            <Col span={12}>
              <div style={{ background: '#d0d0d0', padding: '20px', margin: '10px 0', textAlign: 'center' }}>
                Nested Col span={12}
              </div>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#c0c0c0', padding: '20px', textAlign: 'center' }}>
          Col span={8}
        </div>
      </Col>
    </Row>
  ),
};

// Different column spans
export const DifferentSpans: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={6}>
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
          Col span={6}
        </div>
      </Col>
      <Col span={6}>
        <div style={{ background: '#e0e0e0', padding: '20px', textAlign: 'center' }}>
          Col span={6}
        </div>
      </Col>
      <Col span={6}>
        <div style={{ background: '#d0d0d0', padding: '20px', textAlign: 'center' }}>
          Col span={6}
        </div>
      </Col>
      <Col span={6}>
        <div style={{ background: '#c0c0c0', padding: '20px', textAlign: 'center' }}>
          Col span={6}
        </div>
      </Col>
    </Row>
  ),
};

// Complex layout
export const ComplexLayout: Story = {
  render: () => (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
            Header (span={24})
          </div>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ background: '#e0e0e0', padding: '20px', textAlign: 'center', height: '200px' }}>
            Sidebar (span={6})
          </div>
        </Col>
        <Col span={18}>
          <div style={{ background: '#d0d0d0', padding: '20px', textAlign: 'center', height: '200px' }}>
            Main Content (span={18})
          </div>
        </Col>
      </Row>
      
      <Row gutter={16}>
        <Col span={8}>
          <div style={{ background: '#c0c0c0', padding: '20px', textAlign: 'center', marginTop: '16px' }}>
            Footer Col 1 (span={8})
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: '#b0b0b0', padding: '20px', textAlign: 'center', marginTop: '16px' }}>
            Footer Col 2 (span={8})
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: '#a0a0a0', padding: '20px', textAlign: 'center', marginTop: '16px' }}>
            Footer Col 3 (span={8})
          </div>
        </Col>
      </Row>
    </div>
  ),
};

// Responsive layout example
export const ResponsiveLayout: Story = {
  render: () => (
    <Row gutter={16}>
      <Col span={24}>
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
          Full Width (span={24})
        </div>
      </Col>
      <Col span={12}>
        <div style={{ background: '#e0e0e0', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
          Half Width (span={12})
        </div>
      </Col>
      <Col span={12}>
        <div style={{ background: '#d0d0d0', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
          Half Width (span={12})
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#c0c0c0', padding: '20px', textAlign: 'center' }}>
          One Third (span={8})
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#b0b0b0', padding: '20px', textAlign: 'center' }}>
          One Third (span={8})
        </div>
      </Col>
      <Col span={8}>
        <div style={{ background: '#a0a0a0', padding: '20px', textAlign: 'center' }}>
          One Third (span={8})
        </div>
      </Col>
    </Row>
  ),
}; 