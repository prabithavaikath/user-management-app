import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserCard from './UserCard';
import UserForm from './UserForm';
import { userAPI } from '../services/api';
import { getInitialFormState } from '../config/userFields';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const response = await userAPI.createUser(userData);
      setUsers([...users, response.data]);
      toast.success('User created successfully!');
      return response.data;
    } catch (err) {
      toast.error('Failed to create user');
      throw err;
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await userAPI.updateUser(editingUser.id, userData);
      setUsers(users.map(user => 
        user.id === editingUser.id ? response.data : user
      ));
      toast.success('User updated successfully!');
      setEditingUser(null);
      return response.data;
    } catch (err) {
      toast.error('Failed to update user');
      throw err;
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        toast.success('User deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = async (formData) => {
    if (editingUser) {
      await handleUpdateUser(formData);
    } else {
      await handleCreateUser(formData);
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phoneNumber.includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchUsers} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="header">
        <h1>User Management</h1>
        <button onClick={handleAddUser} className="add-user-btn">
          + Add New User
        </button>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search-btn">
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
      
      <UserForm
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialData={editingUser}
        isEditing={!!editingUser}
      />
    </div>
  );
};

export default UserList;