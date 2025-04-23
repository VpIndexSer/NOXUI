import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Form, { FormItem } from './Form';
import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Radio from '../Radio/Radio';
import Checkbox from '../Checkbox/Checkbox';
import Select from '../Select/Select';
import Button from '../Button/Button';
import './Form.css';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['horizontal', 'vertical', 'inline'],
      description: 'The layout of the form',
    },
    initialValues: {
      control: 'object',
      description: 'Initial values for form fields',
    },
    onFinish: {
      action: 'submitted',
      description: 'Callback when form is submitted successfully',
    },
    onFinishFailed: {
      action: 'submission failed',
      description: 'Callback when form submission fails validation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

interface FormState {
  name?: string;
  email?: string;
  bio?: string;
  gender?: string;
  country?: string;
  newsletter?: boolean;
  notifications?: boolean;
  username?: string;
  password?: string;
  confirmPassword?: string;
  agree?: boolean;
}

// Basic form example
export const Basic: Story = {
  render: () => (
    <Form 
      onFinish={(values) => console.log('Form submitted:', values)}
      validationRules={{
        name: [{ required: true, message: 'Please enter your name' }],
        email: [
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ],
      }}
      initialValues={{
        name: '',
        email: ''
      }}
    >
      <FormItem label="Name" name="name" required>
        <Input />
      </FormItem>
      <FormItem label="Email" name="email" required>
        <Input />
      </FormItem>
      <FormItem name="submit">
        <Button type="submit" label="Submit" />
      </FormItem>
    </Form>
  ),
};

// Form with different layouts
export const DifferentLayouts: Story = {
  render: () => {
    const [formData, setFormData] = useState<FormState>({
      name: '',
      email: '',
    });

    const handleFinish = (values: Record<string, any>) => {
      console.log('Form submitted:', values);
      setFormData(values as FormState);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3>Horizontal Layout (Default)</h3>
          <Form onFinish={handleFinish}>
            <FormItem label="Name" name="name" required>
              <Input 
                value={formData.name}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, name: value }))}
                placeholder="Enter your name" 
              />
            </FormItem>
            <FormItem label="Email" name="email" required>
              <Input 
                value={formData.email}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, email: value }))}
                placeholder="Enter your email" 
              />
            </FormItem>
            <FormItem name="submit">
              <Button type="submit" label="Submit">Submit</Button>
            </FormItem>
          </Form>
        </div>

        <div>
          <h3>Vertical Layout</h3>
          <Form layout="vertical" onFinish={handleFinish}>
            <FormItem label="Name" name="name" required>
              <Input 
                value={formData.name}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, name: value }))}
                placeholder="Enter your name" 
              />
            </FormItem>
            <FormItem label="Email" name="email" required>
              <Input 
                value={formData.email}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, email: value }))}
                placeholder="Enter your email" 
              />
            </FormItem>
            <FormItem name="submit">
              <Button type="submit" label="Submit">Submit</Button>
            </FormItem>
          </Form>
        </div>

        <div>
          <h3>Inline Layout</h3>
          <Form layout="inline" onFinish={handleFinish}>
            <FormItem label="Name" name="name" required>
              <Input 
                value={formData.name}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, name: value }))}
                placeholder="Enter your name" 
              />
            </FormItem>
            <FormItem label="Email" name="email" required>
              <Input 
                value={formData.email}
                onChange={(value) => setFormData((prev: FormState) => ({ ...prev, email: value }))}
                placeholder="Enter your email" 
              />
            </FormItem>
            <FormItem name="submit">
              <Button type="submit" label="Submit">Submit</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  },
};

// Form with validation
export const WithValidation: Story = {
  render: () => {
    const [formData, setFormData] = useState<FormState>({
      username: '',
      password: '',
      confirmPassword: '',
      agree: false,
    });

    const handleFinish = (values: Record<string, any>) => {
      console.log('Form submitted:', values);
      setFormData(values as FormState);
    };

    const handleFinishFailed = (errors: Record<string, string>) => {
      console.log('Validation failed:', errors);
    };

    return (
      <Form 
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
        validationRules={{
          username: [
            { required: true, message: 'Please enter your username' },
            { min: 3, message: 'Username must be at least 3 characters' }
          ],
          password: [
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ],
          confirmPassword: [
            { required: true, message: 'Please confirm your password' },
            { 
              validator: (value) => {
                if (value !== formData.password) {
                  return Promise.reject('Passwords do not match');
                }
                return Promise.resolve();
              }
            }
          ],
          agree: [
            { 
              validator: (value) => {
                if (!value) {
                  return Promise.reject('You must agree to the terms');
                }
                return Promise.resolve();
              }
            }
          ]
        }}
      >
        <FormItem label="Username" name="username" required>
          <Input 
            value={formData.username}
            onChange={(value) => setFormData((prev: FormState) => ({ ...prev, username: value }))}
            placeholder="Enter your username" 
          />
        </FormItem>
        <FormItem label="Password" name="password" required>
          <Input 
            type="password"
            value={formData.password}
            onChange={(value) => setFormData((prev: FormState) => ({ ...prev, password: value }))}
            placeholder="Enter your password" 
          />
        </FormItem>
        <FormItem label="Confirm Password" name="confirmPassword" required>
          <Input 
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => setFormData((prev: FormState) => ({ ...prev, confirmPassword: value }))}
            placeholder="Confirm your password" 
          />
        </FormItem>
        <FormItem name="agree">
          <Checkbox 
            checked={formData.agree}
            onChange={(e) => setFormData((prev: FormState) => ({ ...prev, agree: e.target.checked }))}
            label="I agree to the terms and conditions" 
          />
        </FormItem>
        <FormItem name="submit">
          <Button type="submit" label="Submit">Submit</Button>
        </FormItem>
      </Form>
    );
  },
};

// Form with all form controls
export const WithAllControls: Story = {
  render: () => (
    <Form 
      onFinish={(values) => console.log('Form submitted:', values)}
      initialValues={{
        name: '',
        email: '',
        bio: '',
        gender: '',
        country: '',
        newsletter: false,
        notifications: false
      }}
      validationRules={{
        name: [{ required: true, message: 'Please enter your name' }],
        email: [{ required: true, message: 'Please enter your email' }],
        gender: [{ required: true, message: 'Please select your gender' }],
        country: [{ required: true, message: 'Please select your country' }]
      }}
    >
      <FormItem label="Name" name="name" required>
        <Input />
      </FormItem>
      <FormItem label="Email" name="email" required>
        <Input />
      </FormItem>
      <FormItem label="Bio" name="bio">
        <TextArea 
          value=""
          onChange={() => {}}
        />
      </FormItem>
      <FormItem label="Gender" name="gender" required>
        <Radio 
          value=""
          onChange={() => {}}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]} 
        />
      </FormItem>
      <FormItem label="Country" name="country" required>
        <Select 
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
          ]} 
          placeholder="Select a country"
        />
      </FormItem>
      <FormItem name="newsletter">
        <Checkbox 
          label="Subscribe to newsletter"
          checked={false}
          onChange={(e) => {}}
        />
      </FormItem>
      <FormItem name="notifications">
        <Checkbox 
          label="Receive notifications"
          checked={false}
          onChange={(e) => {}}
        />
      </FormItem>
      <FormItem name="submit">
        <Button type="submit" label="Submit" />
      </FormItem>
    </Form>
  ),
};

// Form with initial values
export const WithInitialValues: Story = {
  render: () => (
    <Form 
      onFinish={(values) => console.log('Form submitted:', values)}
      initialValues={{
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Software developer with 5 years of experience',
        gender: 'male',
        country: 'us',
        newsletter: true,
        notifications: false
      }}
      validationRules={{
        name: [{ required: true, message: 'Please enter your name' }],
        email: [{ required: true, message: 'Please enter your email' }],
        gender: [{ required: true, message: 'Please select your gender' }],
        country: [{ required: true, message: 'Please select your country' }]
      }}
    >
      <FormItem label="Name" name="name" required>
        <Input />
      </FormItem>
      <FormItem label="Email" name="email" required>
        <Input />
      </FormItem>
      <FormItem label="Bio" name="bio">
        <TextArea 
          value=""
          onChange={() => {}}
        />
      </FormItem>
      <FormItem label="Gender" name="gender" required>
        <Radio 
          value=""
          onChange={() => {}}
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
            { label: 'Other', value: 'other' },
          ]} 
        />
      </FormItem>
      <FormItem label="Country" name="country" required>
        <Select 
          options={[
            { label: 'United States', value: 'us' },
            { label: 'United Kingdom', value: 'uk' },
            { label: 'Canada', value: 'ca' },
            { label: 'Australia', value: 'au' },
          ]} 
          placeholder="Select a country"
        />
      </FormItem>
      <FormItem name="newsletter">
        <Checkbox 
          label="Subscribe to newsletter"
          checked={true}
          onChange={(e) => {}}
        />
      </FormItem>
      <FormItem name="notifications">
        <Checkbox 
          label="Receive notifications"
          checked={false}
          onChange={(e) => {}}
        />
      </FormItem>
      <FormItem name="submit">
        <Button type="submit" label="Submit" />
      </FormItem>
    </Form>
  ),
}; 