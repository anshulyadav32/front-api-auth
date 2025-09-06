import React, { useState } from 'react';

export default function MFA() {
  const [setupCode, setSetupCode] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSetup = async () => {
    setMessage('');
    const res = await fetch('http://localhost:8080/auth/mfa/setup', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    setSetupCode(data.qr || '');
    setMessage(data.message || '');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage('');
    const res = await fetch('http://localhost:8080/auth/mfa/verify', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: verifyCode })
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? 'Verified!' : 'Verification failed'));
  };

  const handleDisable = async () => {
    setMessage('');
    const res = await fetch('http://localhost:8080/auth/mfa/disable', {
      method: 'POST',
      credentials: 'include'
    });
    const data = await res.json();
    setMessage(data.message || (res.ok ? 'MFA disabled' : 'Disable failed'));
  };

  return (
    <div>
      <h2>Multi-Factor Authentication</h2>
      <button onClick={handleSetup}>Setup MFA</button>
      {setupCode && <div><img src={setupCode} alt="MFA QR" /></div>}
      <form onSubmit={handleVerify} style={{ marginTop: 10 }}>
        <input type="text" placeholder="Enter MFA code" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
        <button type="submit">Verify</button>
      </form>
      <button onClick={handleDisable} style={{ marginTop: 10 }}>Disable MFA</button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </div>
  );
}
