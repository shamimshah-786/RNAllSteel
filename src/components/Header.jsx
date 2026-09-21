'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaRegClock,
} from 'react-icons/fa';

/* Simple, flat navigation — no dropdowns, no mega menus. */
const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/#reels',   label: 'Reels' },
  { href: '/blog',     label: 'Blog' },
  { href: '/contact',  label: 'Contact' },
];

const PHONE = '+919665181246';
const PHONE_DISPLAY = '+91 96651 81246';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  /* Escape + outside click */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  /* Body scroll lock while the drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0]) && href !== '/#reels';

  return (
    <>
      {/* ═══════════════ UTILITY BAR ═══════════════ */}
      <div className="hidden border-b border-slate-800 bg-slate-950 md:block">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-[11px]
            font-medium tracking-[0.08em] text-slate-400">
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <FaMapMarkerAlt className="text-[10px] text-blue-500" />
                Mumbai · Thane · Mumbra
              </span>
              <span className="inline-flex items-center gap-2">
                <FaRegClock className="text-[10px] text-blue-500" />
                Open Daily · 9:30 AM – 9:15 PM
              </span>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-slate-500">Free site visit &amp; measurement</span>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 text-white transition-colors
                  duration-150 hover:text-blue-400"
              >
                <FaPhone className="text-[10px]" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════ MAIN BAR ═══════════════ */}
      <header
        aria-label="Main navigation"
        className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[68px] items-center justify-between gap-6 lg:h-[76px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              aria-label="RN All Steel Fabrication — Home"
              className="group flex shrink-0 items-center gap-3"
            >
              <Image
                src="/images/logo.jpg"
                alt="RN All Steel Fabrication"
                width={44}
                height={44}
                className="h-11 w-11 rounded-[2px] object-cover ring-1 ring-gray-200"
                priority
              />
              <span className="leading-none">
                <span className="block text-[15px] font-semibold tracking-[0.02em]
                  text-slate-900 sm:text-base">
                  RN ALL STEEL
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase
                  tracking-[0.22em] text-blue-600">
                  Fabrication Work
                </span>
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Primary">
              {NAV.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-3.5 py-2 text-[12px] font-semibold uppercase
                      tracking-[0.12em] transition-colors duration-150
                      focus-visible:outline-none focus-visible:text-blue-700
                      ${active ? 'text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-[1px] h-[2px] bg-blue-600
                        transition-transform duration-200 origin-left
                        ${active ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <a
                href={`https://wa.me/${PHONE.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-[2px]
                  border border-gray-200 text-slate-600 transition-colors duration-150
                  hover:border-emerald-500 hover:text-emerald-600"
              >
                <FaWhatsapp className="text-base" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-[2px] bg-blue-600 px-6 py-3
                  text-[12px] font-semibold uppercase tracking-[0.12em] text-white
                  transition-colors duration-150 hover:bg-blue-700 active:bg-blue-800"
              >
                Get a Quote
              </Link>
            </div>

            {/* ── Mobile actions ── */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${PHONE}`}
                aria-label="Call now"
                className="flex h-10 w-10 items-center justify-center rounded-[2px]
                  bg-blue-600 text-white"
              >
                <FaPhone className="text-xs" />
              </a>
              <button
                ref={toggleRef}
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="flex h-10 w-10 items-center justify-center rounded-[2px]
                  border border-gray-200 text-slate-700 transition-colors duration-150
                  hover:bg-gray-50"
              >
                {open ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════ MOBILE DRAWER ═══════════════ */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-950/50 transition-opacity duration-300
          lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-[330px] flex-col
          bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer head */}
        <div className="flex shrink-0 items-center justify-between border-b
          border-gray-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="RN All Steel Fabrication"
              width={38}
              height={38}
              className="h-[38px] w-[38px] rounded-[2px] object-cover ring-1 ring-gray-200"
            />
            <span className="leading-none">
              <span className="block text-sm font-semibold text-slate-900">
                RN ALL STEEL
              </span>
              <span className="mt-1 block text-[9px] font-semibold uppercase
                tracking-[0.2em] text-blue-600">
                Fabrication Work
              </span>
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-[2px]
              border border-gray-200 text-slate-600"
          >
            <FaTimes className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-2" aria-label="Mobile">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-gray-100
                py-4 text-sm font-semibold uppercase tracking-[0.12em]
                transition-colors duration-150
                ${isActive(href) ? 'text-blue-700' : 'text-slate-700 hover:text-blue-700'}`}
            >
              {label}
              <span className="h-1 w-1 rounded-full bg-blue-600 opacity-0
                transition-opacity duration-150"
                style={{ opacity: isActive(href) ? 1 : 0 }} />
            </Link>
          ))}

          <div className="mt-6 space-y-2 text-[12px] text-slate-500">
            <p className="inline-flex items-center gap-2">
              <FaMapMarkerAlt className="text-[10px] text-blue-600" />
              Mumbai · Thane · Mumbra
            </p>
            <p className="inline-flex items-center gap-2">
              <FaRegClock className="text-[10px] text-blue-600" />
              Open daily · 9:30 AM – 9:15 PM
            </p>
          </div>
        </nav>

        {/* Drawer CTAs */}
        <div className="shrink-0 space-y-2 border-t border-gray-200 px-5 py-5">
          <a
            href={`tel:${PHONE}`}
            className="flex items-center justify-center gap-2 rounded-[2px] bg-blue-600
              px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            <FaPhone className="text-xs" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${PHONE.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-[2px] border
              border-gray-200 px-4 py-3.5 text-[12px] font-semibold uppercase
              tracking-[0.12em] text-slate-700"
          >
            <FaWhatsapp className="text-base text-emerald-500" />
            WhatsApp Us
          </a>
        </div>
      </aside>
    </>
  );
}
