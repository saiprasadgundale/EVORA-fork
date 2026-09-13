"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function OAuthButtons() {
  const { loginWithGoogle, loginWithGitHub } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGitHub = async () => {
    setGithubLoading(true);
    try {
      await loginWithGitHub();
    } finally {
      setGithubLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogle}
        disabled={googleLoading || githubLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {googleLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-blue-900" />
            <span>Connecting to Google...</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={handleGitHub}
        disabled={googleLoading || githubLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {githubLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-slate-800" />
            <span>Connecting to GitHub...</span>
          </>
        ) : (
          <>
            <svg className="h-4 w-4 shrink-0 fill-slate-900" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>Continue with GitHub</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
