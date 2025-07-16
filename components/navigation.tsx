"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  /**
   * When on the home page ("/"), this prop receives the current section id (e.g. "services").
   * For every other page it can be ignored.
   */
  activeSection?: string;
}

export function Navigation({ activeSection = "" }: NavigationProps) {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /**
   * All navigation items in one place so desktop & mobile stay in sync.
   */
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  // ────────────────────────────────────────────────────────────────────────────────
  //  Effects
  // ────────────────────────────────────────────────────────────────────────────────

  // Add a tiny shadow / blur once the user scrolls a bit.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────
  //  Helpers
  // ────────────────────────────────────────────────────────────────────────────────

  /**
   * Smooth‑scroll to the in‑page section or fall back to normal navigation.
   */
  // const handleNavClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   href: string
  // ) => {
  //   if (href.startsWith("/#")) {
  //     e.preventDefault();
  //     const id = href.slice(2); // "/#services" → "services"
  //     const el = document.getElementById(id);
  //     if (el) {
  //       const headerOffset = 80; // equal to our fixed header height
  //       const elementPosition = el.getBoundingClientRect().top;
  //       const offsetPosition =
  //         elementPosition + window.pageYOffset - headerOffset;
  //       window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  //     }
  //   }
  //   setIsMenuOpen(false);
  // };
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        e.preventDefault();
        const id = href.slice(2);
        const el = document.getElementById(id);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        setIsMenuOpen(false);
      }
      // On gallery or other pages: allow default link behavior (go to home with hash)
    } else {
      setIsMenuOpen(false);
    }
  };

  /**
   * Detects whether the supplied item should be highlighted as active.
   */
  const isActive = (name: string, href: string) => {
    if (pathname === "/gallery" && name === "Gallery") return true;
    if (pathname === "/" && name === "Home" && !activeSection) return true;
    if (pathname === "/" && activeSection === name.toLowerCase()) return true;
    return false;
  };

  // ────────────────────────────────────────────────────────────────────────────────
  //  Markup
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-red-900/30 shadow-2xl shadow-red-900/10"
          : "bg-black/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-13 flex items-center justify-center">
              <img
                src="/images/logo2.png" // adjust path if needed
                alt="Diyaansh Event Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">
              Diyaansh Event
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group text-sm ${
                  isActive(item.name, item.href)
                    ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/30"
                    : "text-gray-300 hover:text-white hover:bg-red-900/20"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <span className="relative z-10 flex items-center">
                  {item.name}
                  {isActive(item.name, item.href) && (
                    <div className="ml-2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  )}
                </span>
                {/* subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </Link>
            ))}

            {/* Call‑to‑action button */}
            <Link
              href="https://sklbx.com/cPvyT6k4"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="ml-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/30 rounded-lg text-sm flex items-center"
            >
              Book Now
              <ArrowRight className="ml-1 w-3 h-3" />
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden relative w-8 h-8 text-white hover:text-red-500 transition-all duration-300 p-1 rounded-lg hover:bg-red-900/20 group"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`transition-all duration-300 ${
                  isMenuOpen ? "rotate-180 scale-0" : "rotate-0 scale-100"
                }`}
              >
                <Menu className="w-6 h-6" />
              </div>
              <div
                className={`absolute transition-all duration-300 ${
                  isMenuOpen ? "rotate-0 scale-100" : "rotate-180 scale-0"
                }`}
              >
                <X className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="mt-4 pb-4 border-t border-red-900/30">
            <div className="flex flex-col space-y-1 mt-4">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative transition-all duration-300 py-2 px-4 rounded-lg font-medium text-sm ${
                    isActive(item.name, item.href)
                      ? "text-white bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/20"
                      : "text-white hover:text-red-400 hover:bg-red-900/20"
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    {item.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-3 mt-3 border-t border-red-900/30">
                <Button
                  onClick={() => {
                    // Fake an event object for types, then reuse the same handler
                    handleNavClick(
                      {
                        preventDefault: () => {},
                      } as unknown as React.MouseEvent<HTMLAnchorElement>,
                      "/#contact"
                    );
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/30 rounded-lg text-sm"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
