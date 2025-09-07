
import OAuthButtons from "../components/OAuthButtons";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const { login, verify2FA } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const nav = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(identifier, password);
      if (res.requires2FA && res.pendingToken) {
        setPendingToken(res.pendingToken);
      } else {
        nav("/dashboard");
      }
    } catch {
      alert("Login failed");
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verify2FA(code, pendingToken!);
      nav("/dashboard");
    } catch {
      alert("Invalid 2FA code");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {!pendingToken ? (
        <>
          <form onSubmit={handleLogin}>
            <input
              placeholder="Email / Username / Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <OAuthButtons />
        </>
      ) : (
        <form onSubmit={handleVerify}>
          <input
            placeholder="2FA Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Verify</button>
        </form>
      )}
      <div>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/forgot">Forgot Password?</Link>
      </div>
    </div>
  );
}
