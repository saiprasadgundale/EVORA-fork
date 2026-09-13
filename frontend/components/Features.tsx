"use client";

import { motion } from "framer-motion";
import { BrainCircuit, ShieldAlert, BarChart3, Lightbulb, ArrowRight, Layers } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Transform business data into meaningful AI-generated insights.",
      bgLight: "bg-blue-50 text-blue-900 border-blue-200/60",
    },
    {
      icon: ShieldAlert,
      title: "Risk Intelligence",
      description: "Identify important business risks and warning signals.",
      bgLight: "bg-amber-50 text-amber-700 border-amber-200/60",
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Understand business performance and important trends.",
      bgLight: "bg-cyan-50 text-cyan-700 border-cyan-200/60",
    },
    {
      icon: Lightbulb,
      title: "Intelligent Recommendations",
      description: "Receive AI-powered recommendations to support better decisions.",
      bgLight: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 text-xs font-semibold mb-3 border border-blue-200/60">
            <Layers className="h-3.5 w-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Powerful Intelligence for Better Decisions
          </h2>
          <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Empower your team with automated intelligence that unifies data, risk detection, and forward-looking simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.08)" }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${feat.bgLight} flex items-center justify-center mb-5 border`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-blue-900 group">
                  <span>Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
