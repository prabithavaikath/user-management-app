import React from 'react';

const ValidationMessage = ({ message, touched }) => {
  if (!message || !touched) return null;
  
  return (
    <div className="validation-message">
      {message}
    </div>
  );
};

export default ValidationMessage;