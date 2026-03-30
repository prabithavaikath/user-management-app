import React from 'react';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <div className="user-avatar">
          <FaUser />
        </div>
        <div className="user-actions">
          <button 
            className="action-btn edit-btn" 
            onClick={() => onEdit(user)}
            title="Edit user"
          >
            <FaEdit />
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => onDelete(user.id)}
            title="Delete user"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      
      <div className="user-card-body">
        <h3 className="user-name">
          {user.firstName} {user.lastName}
        </h3>
        
        <div className="user-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone:</span>
            <span className="info-value">{user.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;