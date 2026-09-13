"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/") {
        const sections = ["features", "how-it-works", "about"];
        const scrollPosition = window.scrollY + 200;
        let currentSection = "";

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && el.offsetTop <= scrollPosition) {
            currentSection = `#${section}`;
          }
        }
        setActiveHash(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isAuthPage = pathname === "/login";

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          <Link href="/" className="flex items-center gap-2.5 group select-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-700 to-cyan-500 flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                EVORA
              </span>
              <span className="text-[9px] -mt-1 font-semibold text-cyan-600 tracking-wider uppercase">
                Enterprise AI
              </span>
            </div>
          </Link>

          {!isAuthPage && (
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isSectionActive =
                  link.href === "/"
                    ? activeHash === ""
                    : activeHash === link.href.replace("/", "");

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isSectionActive
                        ? "text-blue-900 font-semibold"
                        : "text-slate-600 hover:text-blue-900 hover:bg-slate-50 rounded-lg"
                    }`}
                  >
                    {link.label}
                    {isSectionActive && (
                      <motion.span
                        layoutId="active-nav-indicator"
                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${
                pathname === "/login"
                  ? "text-blue-900 bg-blue-50/80"
                  : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
              }`}
            >
              Login
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center font-bold px-4 py-2 rounded-xl text-xs bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-950 text-white hover:opacity-95 shadow-sm transition-all group"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-3 pb-5 space-y-2">
              {!isAuthPage &&
                navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-bold bg-blue-900 text-white shadow-sm"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
