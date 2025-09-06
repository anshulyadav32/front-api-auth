import React from 'react';

export default function OAuth() {
  const handleOAuth = (provider) => {
    window.location.href = `http://localhost:8080/auth/${provider}`;
  };
  const handleLink = (provider) => {
    window.location.href = `http://localhost:8080/auth/link/${provider}`;
  };
  return (
    <div>
      <h2>OAuth Login & Linking</h2>
      <button onClick={() => handleOAuth('google')}>Login with Google</button>
      <button onClick={() => handleOAuth('github')}>Login with GitHub</button>
      <hr />
      <button onClick={() => handleLink('google')}>Link Google Account</button>
      <button onClick={() => handleLink('github')}>Link GitHub Account</button>
    </div>
  );
}
