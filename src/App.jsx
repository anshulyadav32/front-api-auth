import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MFA from './pages/MFA';
import OAuth from './pages/OAuth';
import Admin from './pages/Admin';
import Health from './pages/Health';
import OAuthTest from './pages/OAuthTest';

function App() {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/mfa">MFA</Link>
        <Link to="/oauth">OAuth</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/health">Health</Link>
        <Link to="/oauth-test">OAuth Test</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mfa" element={<MFA />} />
        <Route path="/oauth" element={<OAuth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/health" element={<Health />} />
        <Route path="/oauth-test" element={<OAuthTest />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
