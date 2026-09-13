"use client";

import { motion } from "framer-motion";
import { Database, Cpu, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      stepName: "Provide Data",
      description: "Provide your business information via spreadsheets or data feeds.",
      icon: Database,
    },
    {
      number: "02",
      stepName: "AI Analyzes",
      description: "The AI processes and analyzes your data with predictive models.",
      icon: Cpu,
    },
    {
      number: "03",
      stepName: "Get Insights",
      description: "Receive intelligent insights, risk warnings, and recommendations.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
            Workflow Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            How It Works
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Three simple steps to transform business telemetry into confident decisions.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Animated Connecting Line on desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-cyan-300 -z-10" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-card text-center relative group hover:border-blue-300 transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-700 text-white flex items-center justify-center font-black text-sm mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  {step.number}
                </div>
                <div className="w-10 h-10 mx-auto rounded-xl bg-slate-50 text-blue-900 flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900">{step.stepName}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
