// src/components/Form/Form.tsx
import React, { createContext, useContext, useState } from 'react';
import Row from '../Grid/Row';
import Col from '../Grid/Col';
import './Form.css';

// Form Context Types
interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  layout: 'horizontal' | 'vertical' | 'inline';
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string, touched: boolean) => void;
  setFieldError: (name: string, error: string) => void;
}

// Form Props Types
export interface FormProps {
  initialValues?: Record<string, any>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, string>) => void;
  children: React.ReactNode;
  className?: string;
  validationRules?: Record<string, ValidationRule[]>;
}

export interface ValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (value: any) => Promise<void> | void;
  min?: number;
  max?: number;
  type?: 'string' | 'number' | 'boolean' | 'date' | 'email';
}

// Create Form Context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Form Component
export const Form: React.FC<FormProps> = ({
  initialValues = {},
  layout = 'horizontal',
  onFinish,
  onFinishFailed,
  children,
  className = '',
  validationRules = {},
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const setFieldTouched = (name: string, isTouched: boolean) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  };

  const setFieldError = (name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateField = async (name: string, value: any) => {
    const rules = validationRules[name] || [];
    let error = '';

    for (const rule of rules) {
      try {
        if (rule.required && !value) {
          error = rule.message || 'This field is required';
          break;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          error = rule.message || 'Invalid format';
          break;
        }

        if (rule.validator) {
          await rule.validator(value);
        }

        if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = rule.message || 'Invalid email format';
          break;
        }

        if (rule.min !== undefined && (value.length < rule.min || value < rule.min)) {
          error = rule.message || `Minimum value is ${rule.min}`;
          break;
        }

        if (rule.max !== undefined && (value.length > rule.max || value > rule.max)) {
          error = rule.message || `Maximum value is ${rule.max}`;
          break;
        }
      } catch (err) {
        error = err instanceof Error ? err.message : 'Validation failed';
        break;
      }
    }

    setFieldError(name, error);
    return !error;
  };

  const validateForm = async () => {
    const fieldNames = Object.keys(validationRules);
    const validationResults = await Promise.all(
      fieldNames.map(name => validateField(name, values[name]))
    );
    return validationResults.every(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    
    if (isValid) {
      onFinish?.(values);
    } else {
      onFinishFailed?.(errors);
    }
  };

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        layout,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      }}
    >
      <form
        className={`custom-form layout-${layout} ${className}`}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// Form Item Component
export interface FormItemProps {
  label?: string;
  name: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormItem: React.FC<FormItemProps> = ({
  label,
  name,
  children,
  required,
  className = '',
}) => {
  const form = useContext(FormContext);
  if (!form) throw new Error('FormItem must be used within Form');

  const { layout, values, errors, touched, setFieldValue, setFieldTouched } = form;

  const handleChange = (value: any) => {
    setFieldValue(name, value);
  };

  const handleBlur = () => {
    setFieldTouched(name, true);
  };

  const error = touched[name] && errors[name];

  const childElement = React.Children.only(children);
  const childProps = {
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    error: error,
  };

  const renderContent = () => {
    return React.cloneElement(childElement as React.ReactElement, childProps);
  };

  if (layout === 'inline') {
    return (
      <div className={`form-item inline ${className} ${error ? 'has-error' : ''}`}>
        {label && <label className={required ? 'required' : ''}>{label}</label>}
        {renderContent()}
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`form-item vertical ${className} ${error ? 'has-error' : ''}`}>
        {label && <label className={required ? 'required' : ''}>{label}</label>}
        {renderContent()}
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }

  // Horizontal layout (default)
  return (
    <Row className={`form-item horizontal ${className} ${error ? 'has-error' : ''}`}>
      <Col span={6}>
        {label && <label className={required ? 'required' : ''}>{label}</label>}
      </Col>
      <Col span={18}>
        {renderContent()}
        {error && <div className="error-message">{error}</div>}
      </Col>
    </Row>
  );
};

export default Form;