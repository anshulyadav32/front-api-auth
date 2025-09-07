import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-xl rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <strong>User:</strong>
        <pre className="bg-gray-100 p-2 rounded text-sm mt-2">{JSON.stringify(user, null, 2)}</pre>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
    </div>
  );
}
