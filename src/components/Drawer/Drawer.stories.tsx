// Drawer.stories.tsx
import React, { useState } from 'react';
import Drawer from './Drawer';
import { DocsPage } from '@storybook/addon-docs';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component: 'A Drawer component that slides in from the edge of the screen. Supports placement, custom size, footer, and destroy on close.'
      },
      page: DocsPage,
    },
    layout: 'centered',
    tags: ['autodocs'],
  },
};

/**
 * Basic usage of the Drawer component.
 */
export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Drawer"
        footer={<button onClick={() => setOpen(false)}>Close</button>}
      >
        <p>Drawer Content</p>
      </Drawer>
    </>
  );
};
Basic.parameters = {
  docs: {
    description: {
      story: 'A basic Drawer with a title and footer.'
    }
  }
};

/**
 * Drawer that slides in from the right (default).
 */
export const RightDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Right Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Right Drawer"
        placement="right"
        width={400}
      >
        <p>Right Drawer Content</p>
      </Drawer>
    </>
  );
};
RightDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer slides in from the right.'
    }
  }
};

/**
 * Drawer that slides in from the left.
 */
export const LeftDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Left Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Left Drawer"
        placement="left"
        width={400}
      >
        <p>Left Drawer Content</p>
      </Drawer>
    </>
  );
};
LeftDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer slides in from the left.'
    }
  }
};

/**
 * Drawer that slides in from the top.
 */
export const TopDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Top Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Top Drawer"
        placement="top"
        height={200}
      >
        <p>Top Drawer Content</p>
      </Drawer>
    </>
  );
};
TopDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer slides in from the top.'
    }
  }
};

/**
 * Drawer that slides in from the bottom.
 */
export const BottomDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Bottom Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Bottom Drawer"
        placement="bottom"
        height={200}
      >
        <p>Bottom Drawer Content</p>
      </Drawer>
    </>
  );
};
BottomDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer slides in from the bottom.'
    }
  }
};

/**
 * Drawer with a custom footer.
 */
export const DrawerWithFooter = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Drawer With Footer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Drawer With Footer"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={() => setOpen(false)}>OK</button>
          </div>
        }
      >
        <p>Drawer Content with Footer</p>
      </Drawer>
    </>
  );
};
DrawerWithFooter.parameters = {
  docs: {
    description: {
      story: 'Drawer with a custom footer section.'
    }
  }
};

/**
 * Drawer that destroys its content on close.
 */
export const DestroyOnCloseDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Destroy On Close Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Destroy On Close Drawer"
        destroyOnClose
      >
        <p>This drawer will destroy its content on close.</p>
      </Drawer>
    </>
  );
};
DestroyOnCloseDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer with destroyOnClose enabled.'
    }
  }
};

/**
 * Drawer with custom width and background color.
 */
export const CustomSizeDrawer = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Custom Size Drawer</button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Custom Size Drawer"
        placement="right"
        width={600}
        style={{ background: '#f0f5ff' }}
      >
        <p>Drawer with custom width and background color.</p>
      </Drawer>
    </>
  );
};
CustomSizeDrawer.parameters = {
  docs: {
    description: {
      story: 'Drawer with custom width and background color.'
    }
  }
};