"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, BrainCircuit, ShieldCheck } from "lucide-react";

export default function CTA() {
  return (
    <section className="pt-20 pb-12 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-950 p-10 sm:p-16 text-center text-white shadow-2xl overflow-hidden mb-20"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Ready to Make Smarter Business Decisions?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
            Start exploring intelligent insights powered by AI. Transform raw data into strategic competitive advantage today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl text-sm bg-white text-blue-950 hover:bg-slate-100 hover:text-blue-900 shadow-xl transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center font-bold px-7 py-3.5 rounded-xl text-sm border border-white/40 text-white hover:bg-white/10 transition-all"
            >
              Sign In to EVORA
            </Link>
          </div>
        </motion.div>

        <div id="about" className="pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                  EVORA
                </span>
              </Link>

              <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                Autonomous enterprise intelligence platform transforming business data into explainable, optimized decisions with multi-agent reasoning and predictive ML.
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <BrainCircuit className="h-4 w-4 text-blue-900" /> Multi-Agent AI
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> Risk-Aware
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Platform
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#features" className="hover:text-blue-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-900 transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-blue-900 transition-colors">
                    Executive Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Account
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link href="/login" className="hover:text-blue-900 transition-colors">
                    Client Login
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-blue-900 transition-colors">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} EVORA Intelligence. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-500">
              <span>Next.js 16 & Tailwind CSS</span>
              <span>•</span>
              <span>Enterprise AI SaaS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
