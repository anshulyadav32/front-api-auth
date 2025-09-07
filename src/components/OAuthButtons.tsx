import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function OAuthButtons() {
  return (
    <div className="mt-6">
      <div className="relative text-center text-xs text-slate-500 my-4">
        <span className="bg-white px-2">or continue with</span>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-slate-200 -z-10" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="w-full gap-2">
          <a href={`${API_BASE}/api/oauth/google`}>
            <Mail className="w-4 h-4" /> Google
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full gap-2">
          <a href={`${API_BASE}/api/oauth/github`}>
            <Github className="w-4 h-4" /> GitHub
          </a>
        </Button>
      </div>
    </div>
  );
}
