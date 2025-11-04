'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaWhatsapp, FaHardHat, FaEnvelope, FaHome, FaTools, FaFolderOpen } from 'react-icons/fa';
import Image from 'next/image';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const sc = window.scrollY;
      setIsScrolled(sc > 40);
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, sc / total) : 0;
      setScrollProgress(progress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close sidebar when pressing Escape or clicking outside
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsSidebarOpen(false);
    };
    const onClick = (e) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target) && !toggleRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isSidebarOpen]);

  const navItems = [
    { href: '/', label: 'Home', icon: FaHome },
    { href: '/about', label: 'About', icon: FaTools },
    { href: '/services', label: 'Services', icon: FaTools },
    { href: '/projects', label: 'Projects', icon: FaFolderOpen },
    { href: '/contact', label: 'Contact', icon: FaEnvelope },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-20 transition-all duration-300 
          ${isScrolled ? 'backdrop-blur-md bg-white shadow-md border-b border-slate-100' : 'bg-white'}`}
        aria-label="Main header"
      >
        <div className="mx-auto container px-2 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="RN All Steel - Home">
              <div className="relative">
                {/* <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-sky-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-105">
                  <FaHardHat className="h-5 w-5" aria-hidden />
                </div> */}
                <Image src={"/images/logo.jpg"}
                  alt="RN All Steel Fabrication Logo"
                  width={40}
                  height={40}
                  className="rounded-xl object-cover transition-transform duration-300 "
                />
                <span className="sr-only">RN All Steel Fabrication</span>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-md sm:text-lg font-extrabold text-slate-800 tracking-tight transition-colors duration-200 group-hover:text-blue-600">
                  RN ALL STEEL {"Fabrication".toUpperCase()}
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex lg:items-center lg:gap-6">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="relative px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {n.label}
                  <span className="absolute left-1/2 bottom-0 block h-0.5 w-0 bg-gradient-to-r from-blue-600 to-sky-600 transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Contact buttons - desktop only */}
              <div className="hidden lg:flex lg:items-center lg:gap-3">
                <a
                  href="tel:+919665181246"
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-sky-700 transition"
                >
                  <FaPhone className="h-4 w-4" aria-hidden />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/+919665181246"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-emerald-700 bg-white hover:bg-emerald-50 transition"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Mobile / Sidebar Toggle */}
              <button
                ref={toggleRef}
                onClick={() => setIsSidebarOpen((s) => !s)}
                aria-expanded={isSidebarOpen}
                aria-controls="sidebar"
                className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg bg-white/60  hover:bg-white transition"
                title="Open menu"
              >
                {isSidebarOpen ? <FaTimes className="h-5 w-5 text-slate-700" /> : <FaBars className="h-5 w-5 text-slate-700" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-slate-100">
          <div
            className="h-0.5 bg-gradient-to-r from-blue-600 to-sky-600 transition-all duration-150"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            aria-hidden
          />
        </div> */}
      </header>

      {/* Spacer so page content isn't hidden under fixed header */}
      <div className="h-20" />

      {/* Sidebar (drawer) */}
      <aside
        id="sidebar"
        ref={sidebarRef}
        aria-hidden={!isSidebarOpen}
        className={`fixed inset-y-0 right-0 z-60 w-full max-w-xs transform bg-white shadow-2xl transition-transform duration-300 sm:max-w-sm
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-600 text-white">
                <FaHardHat className="h-4 w-4" />
              </div> */}
              <Image src={"/images/logo.jpg"}
                alt="RN All Steel Fabrication Logo"
                width={40}
                height={40}
                className="rounded-xl object-cover transition-transform duration-300 "
              />
              <div>
                <div className="text-sm font-bold text-slate-900">RN ALL STEEL</div>
                <div className="text-xs text-slate-500">Fabrication Work</div>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-50 hover:bg-slate-100"
            >
              <FaTimes className="h-4 w-4 text-slate-700" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Why choose us</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                  Precision engineering & robust materials
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                  15+ years serving Mumbai & Thane
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                  ISO-grade quality & timely delivery
                </li>
              </ul>
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="px-5 pb-6 pt-4">
            <div className="flex gap-3">
              <a
                href="tel:+919665181246"
                onClick={() => setIsSidebarOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-3 text-sm font-semibold text-white shadow"
              >
                <FaPhone className="h-4 w-4" />
                Call
              </a>
              <a
                href="https://wa.me/+919665181246"
                onClick={() => setIsSidebarOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-emerald-700 bg-white"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>

            <div className="mt-3 text-center text-xs text-slate-500">
              Free consultation & site visits in Mumbai & Thane
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-slate-900/40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      />
    </>
  );
}