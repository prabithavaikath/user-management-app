// Field configuration - Add new fields here without changing other code
export const userFields = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: {
      pattern: '^[A-Za-z\\s]{2,50}$',
      message: 'First name must be 2-50 characters and contain only letters'
    },
    placeholder: 'Enter first name',
    order: 1
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: {
      pattern: '^[A-Za-z\\s]{2,50}$',
      message: 'Last name must be 2-50 characters and contain only letters'
    },
    placeholder: 'Enter last name',
    order: 2
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    validation: {
      pattern: '^[\\+]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[(]?[0-9]{1,4}[)]?[-\\s\\.]?[0-9]{1,5}[-\\s\\.]?[0-9]{1,5}$',
      message: 'Please enter a valid phone number'
    },
    placeholder: 'Enter phone number',
    order: 3
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    validation: {
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
      message: 'Please enter a valid email address'
    },
    placeholder: 'Enter email address',
    order: 4
  },  
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    required: false,
    validation: {
      pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      message: 'Please enter a valid date (YYYY-MM-DD)'
    },
    placeholder: 'Enter date of birth',
    order: 5
  }
];

// Helper function to get initial form state
export const getInitialFormState = () => {
  const initialState = {};
  userFields.forEach(field => {
    initialState[field.name] = '';
  });
  return initialState;
};

// Helper function to validate a field
export const validateField = (field, value) => {
  if (field.required && !value) {
    return `${field.label} is required`;
  }
  
  if (field.validation?.pattern && value) {
    const regex = new RegExp(field.validation.pattern);
    if (!regex.test(value)) {
      return field.validation.message;
    }
  }
  
  return null;
};

// Helper function to validate all fields
export const validateForm = (formData) => {
  const errors = {};
  
  userFields.forEach(field => {
    const error = validateField(field, formData[field.name]);
    if (error) {
      errors[field.name] = error;
    }
  });
  
  return errors;
};