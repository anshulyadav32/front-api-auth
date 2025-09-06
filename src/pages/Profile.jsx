import React, { useEffect, useState } from 'react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/auth/profile', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(() => setError('Error fetching profile'));
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Profile</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {profile ? (
        <div>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
