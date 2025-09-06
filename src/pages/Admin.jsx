import React, { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/auth/admin/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
      .catch(() => setError('Error fetching users'));
  }, []);

  const handleAction = async (id, action) => {
    let endpoint = '';
    if (action === 'promote') endpoint = '/auth/admin/promote';
    if (action === 'demote') endpoint = '/auth/admin/demote';
    if (action === 'revoke') endpoint = '/auth/admin/revoke-sessions';
    const res = await fetch(`http://localhost:8080${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      setUsers(users.map(u => u.id === id ? { ...u, role: action === 'promote' ? 'admin' : action === 'demote' ? 'user' : u.role } : u));
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleAction(user.id, 'promote')}>Promote</button>
                <button onClick={() => handleAction(user.id, 'demote')}>Demote</button>
                <button onClick={() => handleAction(user.id, 'revoke')}>Revoke Sessions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
