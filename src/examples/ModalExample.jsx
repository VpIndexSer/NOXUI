import React, { useState } from 'react';
import { Button, Modal, Space, Typography } from '../components';
import './ModalExample.css';

const { Title, Text } = Typography;

const ModalExample = () => {
  const [basicVisible, setBasicVisible] = useState(false);
  const [customVisible, setCustomVisible] = useState(false);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const showBasicModal = () => setBasicVisible(true);
  const showCustomModal = () => setCustomVisible(true);
  const showFullscreenModal = () => setFullscreenVisible(true);
  const showLoadingModal = () => setLoadingVisible(true);

  const handleBasicOk = () => setBasicVisible(false);
  const handleBasicCancel = () => setBasicVisible(false);
  const handleCustomOk = () => setCustomVisible(false);
  const handleCustomCancel = () => setCustomVisible(false);
  const handleFullscreenOk = () => setFullscreenVisible(false);
  const handleFullscreenCancel = () => setFullscreenVisible(false);
  const handleLoadingOk = () => {
    setLoadingVisible(false);
  };
  const handleLoadingCancel = () => setLoadingVisible(false);

  return (
    <div className="modal-example-container">
      <Title level={2}>Modal Examples</Title>
      <Text className="description">
        Examples of different modal configurations and use cases.
      </Text>

      <Space className="button-group">
        <Button type="primary" onClick={showBasicModal}>
          Basic Modal
        </Button>
        <Button onClick={showCustomModal}>Custom Modal</Button>
        <Button onClick={showFullscreenModal}>Fullscreen Modal</Button>
        <Button onClick={showLoadingModal}>Loading Modal</Button>
      </Space>

      {/* Basic Modal */}
      <Modal
        title="Basic Modal"
        visible={basicVisible}
        onOk={handleBasicOk}
        onCancel={handleBasicCancel}
      >
        <p>This is a basic modal example.</p>
        <p>You can put any content here.</p>
      </Modal>

      {/* Custom Modal */}
      <Modal
        title="Custom Modal"
        visible={customVisible}
        onOk={handleCustomOk}
        onCancel={handleCustomCancel}
        okText="Submit"
        cancelText="Close"
        okButtonProps={{ type: 'primary', danger: true }}
        width={600}
        centered
      >
        <div className="custom-modal-content">
          <Title level={4}>Custom Styling</Title>
          <Text>
            This modal demonstrates custom styling and configuration options:
          </Text>
          <ul>
            <li>Custom width (600px)</li>
            <li>Centered vertically</li>
            <li>Custom button text</li>
            <li>Danger primary button</li>
          </ul>
        </div>
      </Modal>

      {/* Fullscreen Modal */}
      <Modal
        title="Fullscreen Modal"
        visible={fullscreenVisible}
        onOk={handleFullscreenOk}
        onCancel={handleFullscreenCancel}
        fullscreen
        footer={null}
      >
        <div className="fullscreen-modal-content">
          <Title level={3}>Fullscreen Modal</Title>
          <Text>
            This modal takes up the entire screen. It's useful for displaying
            complex content or immersive experiences.
          </Text>
          <div className="fullscreen-modal-actions">
            <Button onClick={handleFullscreenCancel}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* Loading Modal */}
      <Modal
        title="Loading Modal"
        visible={loadingVisible}
        onOk={handleLoadingOk}
        onCancel={handleLoadingCancel}
        confirmLoading={true}
        maskClosable={false}
        keyboard={false}
      >
        <p>This modal demonstrates loading state and restricted closing.</p>
        <p>You cannot close this modal by:</p>
        <ul>
          <li>Clicking the mask</li>
          <li>Pressing ESC key</li>
          <li>Clicking the close button</li>
        </ul>
        <p>You must click the OK button to close it.</p>
      </Modal>
    </div>
  );
};

export default ModalExample; 