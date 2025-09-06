import React, { useEffect, useState } from 'react';

export default function Health() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/health')
      .then(res => res.json())
      .then(data => setStatus(JSON.stringify(data)))
      .catch(() => setStatus('Error fetching health status'));
  }, []);

  return (
    <div>
      <h2>Health Check</h2>
      <pre>{status}</pre>
    </div>
  );
}
