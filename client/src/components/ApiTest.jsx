import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';

const ApiTest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers();
      console.log('Users fetched:', response.data);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', margin: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Loading users...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', margin: '20px', background: '#ffebee', borderRadius: '8px' }}>
        <h3 style={{ color: '#c62828' }}>❌ Error: {error}</h3>
        <button 
          onClick={fetchUsers} 
          style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', margin: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
      <h3 style={{ color: '#2e7d32' }}>✅ API Connected Successfully!</h3>
      <p>Total Users: {users.length}</p>
      <details>
        <summary>View Users</summary>
        <pre style={{ background: '#fff', padding: '10px', marginTop: '10px', overflow: 'auto' }}>
          {JSON.stringify(users, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ApiTest;