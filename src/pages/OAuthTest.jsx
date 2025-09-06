import React, { useEffect, useState } from 'react';

export default function OAuthTest() {
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/oauth-test')
      .then(res => res.json())
      .then(data => setResult(JSON.stringify(data, null, 2)))
      .catch(() => setResult('Error fetching test result'));
  }, []);

  return (
    <div>
      <h2>OAuth Test Page</h2>
      <pre>{result}</pre>
    </div>
  );
}
