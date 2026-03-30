import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { userFields, getInitialFormState, validateField } from '../config/userFields';
import ValidationMessage from './ValidationMessage';
import './UserForm.css';

const UserForm = ({ isOpen, onClose, onSubmit, initialData, isEditing }) => {
  const initialState = initialData || getInitialFormState();
  
  const {
    formData,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue
  } = useForm(initialState, async (data) => {
    await onSubmit(data);
    onClose();
  }, userFields);

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach(key => {
        if (formData.hasOwnProperty(key)) {
          setFieldValue(key, initialData[key]);
        }
      });
    }
  }, [initialData, setFieldValue]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          {userFields.sort((a, b) => a.order - b.order).map(field => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="required-star">*</span>}
              </label>
              
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={field.placeholder}
                className={errors[field.name] && touched[field.name] ? 'error-input' : ''}
                disabled={isSubmitting}
              />
              
              <ValidationMessage 
                message={errors[field.name]} 
                touched={touched[field.name]}
              />
            </div>
          ))}
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;