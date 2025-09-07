import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forgot", { email });
      alert("Reset link sent!");
      nav("/login");
    } catch {
      alert("Failed to send reset link");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Reset Link</button>
    </form>
  );
}
