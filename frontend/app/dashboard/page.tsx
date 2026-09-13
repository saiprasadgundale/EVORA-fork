"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-500">Verifying session...</p>
      </div>
    );
  }

  const displayName = user?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm text-center space-y-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center text-white text-lg font-black shadow-md">
          E
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Welcome to EVORA
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Logged in as <span className="font-semibold text-slate-800">{displayName}</span>
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={logout}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
