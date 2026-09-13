"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, BrainCircuit, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-100/40 via-indigo-50/30 to-cyan-100/20 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-900 text-xs font-semibold shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-700 animate-pulse" />
              <span>AI-Powered Business Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Turn Business Data Into{" "}
              <span className="bg-gradient-to-r from-blue-900 via-indigo-700 to-cyan-600 bg-clip-text text-transparent">
                Intelligent Decisions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              EVORA uses advanced AI to analyze your business data, identify critical operational risks, generate actionable insights, and provide intelligent recommendations for executive leadership.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center font-bold px-6 py-3.5 rounded-xl text-sm bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-950 text-white hover:opacity-95 shadow-md hover:shadow-xl hover:shadow-blue-900/15 transition-all group"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center font-bold px-6 py-3.5 rounded-xl text-sm bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all border border-slate-200/80"
              >
                Explore Features
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Zero configuration required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Real-time predictive ML</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Enterprise grade security</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100/50 via-indigo-50/40 to-cyan-100/30 blur-2xl" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                <defs>
                  <linearGradient id="heroNeuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#4F46E5" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                <g stroke="url(#heroNeuralGrad)" strokeWidth="1.5" strokeDasharray="4 4">
                  <line x1="120" y1="120" x2="250" y2="250" />
                  <line x1="380" y1="130" x2="250" y2="250" />
                  <line x1="130" y1="370" x2="250" y2="250" />
                  <line x1="370" y1="360" x2="250" y2="250" />
                  <line x1="120" y1="120" x2="380" y2="130" />
                  <line x1="130" y1="370" x2="370" y2="360" />
                </g>

                <circle cx="250" cy="250" r="14" fill="#1E3A8A" />
                <circle cx="250" cy="250" r="24" fill="#1E3A8A" fillOpacity="0.15" />
                <circle cx="120" cy="120" r="8" fill="#4F46E5" />
                <circle cx="380" cy="130" r="8" fill="#06B6D4" />
                <circle cx="130" cy="370" r="8" fill="#06B6D4" />
                <circle cx="370" cy="360" r="8" fill="#4F46E5" />
              </svg>

              <div className="relative z-10 w-24 h-24 rounded-3xl bg-white shadow-xl border border-slate-200/80 flex flex-col items-center justify-center p-3 text-center">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-900 via-indigo-700 to-cyan-500 flex items-center justify-center text-white shadow-sm mb-1">
                  <BrainCircuit className="h-5 w-5 animate-pulse" />
                </div>
                <span className="text-[10px] font-extrabold uppercase text-slate-900 tracking-wider">
                  EVORA AI
                </span>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="absolute top-2 left-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200/80 w-44"
              >
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase">
                  <span>Revenue</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    ↑ 14.8%
                  </span>
                </div>
                <p className="text-lg font-black text-slate-900 mt-1">₹12.5M</p>
                <div className="mt-1.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-900 to-cyan-500 rounded-full w-4/5" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-8 -right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200/80 w-52"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Sparkles className="h-3.5 w-3.5 text-blue-700" />
                  <span>AI Insight</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  Product category A demand surge warrants immediate scale.
                </p>
                <div className="mt-2 flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Confidence</span>
                  <span className="font-bold text-emerald-600">94%</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 -left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200/80 w-48"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
                  <span>Risk Alert</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-1">
                  Operating expenses expanding faster than seasonal baseline.
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Status</span>
                  <span className="text-amber-600 font-bold">Flagged</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-4 right-0 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-slate-200/80 w-44"
              >
                <p className="text-[10px] font-semibold text-slate-400 uppercase">
                  Operating Profit
                </p>
                <p className="text-lg font-black text-blue-900 mt-0.5">₹3.2M</p>
                <p className="text-[10px] text-emerald-600 font-bold mt-0.5">↑ 25.6% Margin</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
