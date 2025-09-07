import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className="nav-bar">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/mfa">MFA</Link>
      <Link to="/oauth">OAuth</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/health">Health</Link>
      <Link to="/oauth-test">OAuth Test</Link>
    </nav>
  );
}

export default Nav;
