"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
  FaCommentDots,
  FaChevronRight,
} from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

/* ───────────────────────────────────────────
   DATA
─────────────────────────────────────────── */
const QUICK_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/about",    label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog",     label: "Blog" },
  { href: "/contact",  label: "Contact" },
];

const SERVICES = [
  "Steel Railings",
  "Main Gates",
  "Window Grills",
  "Main Doors",
  "Collapsible Gates",
  "Street Stalls",
];

const CONTACT_ITEMS = [
  {
    icon: FaPhone,
    href: "tel:+919665181246",
    primary: "+91 96651 81246",
    secondary: "Call / WhatsApp",
    label: "Call +91 96651 81246",
  },
  {
    icon: FaEnvelope,
    href: "mailto:rnallsteelfabrication@gmail.com",
    primary: "rnallsteelfabrication@gmail.com",
    secondary: "General inquiries",
    label: "Email us",
  },
  {
    icon: FaMapMarkerAlt,
    href: "https://maps.google.com/?q=Mumbai+Thane",
    primary: "Mumbai & Thane",
    secondary: "On-site visits by appointment",
    label: "Service area",
  },
  {
    icon: FaClock,
    href: null,
    primary: "Mon – Sun: 9 AM – 9 PM",
    secondary: "Emergency support available",
    label: "Business hours",
  },
];

const SOCIALS = [
  {
    href: "https://www.facebook.com/p/R-N-All-fabrication-work-100067881897099/",
    label: "Facebook",
    icon: FaFacebook,
    hover: "hover:bg-blue-700 hover:border-blue-600",
  },
  {
    href: "https://www.instagram.com/rnallsteelfabrication",
    label: "Instagram",
    icon: FaInstagram,
    hover: "hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-400 hover:border-pink-500",
  },
  {
    href: "https://wa.me/+919665181246",
    label: "WhatsApp",
    icon: FaWhatsapp,
    hover: "hover:bg-green-600 hover:border-green-600",
  },
];

/* ───────────────────────────────────────────
   FLOATING CONTACT BUTTON
─────────────────────────────────────────── */
function FloatingContact({ open, setOpen }) {
  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50
      flex flex-col items-center gap-3">

      {/* Expanded action buttons */}
      <div
        className={`flex flex-col items-center gap-2.5 transition-all duration-300
          ${open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        {/* Label */}
        <span className={`text-[10px] font-black text-white/70 uppercase
          tracking-[0.18em] transition-opacity duration-200
          ${open ? "opacity-100" : "opacity-0"}`}>
          Contact Us
        </span>

        {/* WhatsApp */}
        <Link href="https://wa.me/+919665181246"
          aria-label="Chat on WhatsApp"
          className="group relative flex items-center gap-2.5"
          target="_blank" rel="noopener noreferrer">
          <span className="absolute right-14 bg-gray-900 text-white text-[11px]
            font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap
            border border-gray-700/50 shadow-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-150
            pointer-events-none">
            WhatsApp
          </span>
          <div className="w-12 h-12 rounded-2xl bg-green-500 hover:bg-green-400
            active:scale-95 shadow-lg shadow-green-900/40
            flex items-center justify-center text-white text-lg
            transition-all duration-200 hover:-translate-y-0.5
            border border-green-400/30">
            <FaWhatsapp />
          </div>
        </Link>

        {/* Call */}
        <Link href="tel:+919665181246"
          aria-label="Call us"
          className="group relative flex items-center gap-2.5">
          <span className="absolute right-14 bg-gray-900 text-white text-[11px]
            font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap
            border border-gray-700/50 shadow-lg
            opacity-0 group-hover:opacity-100 transition-opacity duration-150
            pointer-events-none">
            Call Now
          </span>
          <div className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500
            active:scale-95 shadow-lg shadow-blue-900/40
            flex items-center justify-center text-white text-base
            transition-all duration-200 hover:-translate-y-0.5
            border border-blue-400/30">
            <FaPhone />
          </div>
        </Link>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
        aria-label={open ? "Close contact actions" : "Open contact actions"}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-500
          active:scale-95 text-white shadow-xl shadow-blue-900/50
          flex items-center justify-center
          transition-all duration-200 hover:-translate-y-0.5
          border border-blue-400/30
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-400 focus-visible:ring-offset-2
          focus-visible:ring-offset-gray-950"
      >
        {/* Rotating icon */}
        <span className={`transition-all duration-300 ${open ? "rotate-90 scale-110" : "rotate-0"}`}>
          {open
            ? <FaTimes className="w-5 h-5" />
            : <FaCommentDots className="w-5 h-5" />
          }
        </span>

        {/* Ping dot — only when closed */}
        {!open && (
          <>
            <span className="absolute -top-1 -right-1 w-3 h-3
              bg-green-400 rounded-full border-2 border-gray-950" />
            <span className="absolute -top-1 -right-1 w-3 h-3
              bg-green-400 rounded-full animate-ping opacity-60" />
          </>
        )}
      </button>
    </div>
  );
}

/* ───────────────────────────────────────────
   MAIN FOOTER
─────────────────────────────────────────── */
export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="relative bg-gray-950 text-white overflow-hidden">

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px
          bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

        {/* Subtle grid overlay */}
        <div aria-hidden className="absolute inset-0 opacity-[0.025] pointer-events-none">
          <div className="absolute inset-0
            bg-[linear-gradient(rgba(59,130,246,1)_1px,transparent_1px),
               linear-gradient(90deg,rgba(59,130,246,1)_1px,transparent_1px)]
            bg-[size:48px_48px]" />
        </div>

        {/* Blur accents */}
        <div aria-hidden className="absolute -top-16 -left-16 w-56 h-56
          rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />
        <div aria-hidden className="absolute -bottom-16 -right-16 w-72 h-72
          rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

        {/* ── MAIN GRID ── */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            {/* ── Brand col (spans 4) ── */}
            <div className="sm:col-span-2 lg:col-span-4">
              {/* Logo + name */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="relative flex-shrink-0">
                  <Image
                    src="/images/logo.jpg"
                    alt="RN All Steel Fabrication Logo"
                    width={52} height={52}
                    className="rounded-xl object-cover ring-1 ring-white/10"
                  />
                  <div className="absolute -inset-1 bg-blue-500/15
                    rounded-[14px] blur-sm -z-10" />
                </div>
                <div>
                  <p className="text-xl font-black tracking-tight leading-none">
                    RN ALL STEEL
                  </p>
                  <p className="text-blue-400 text-xs font-bold mt-0.5 uppercase
                    tracking-[0.15em]">
                    Fabrication Work
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Professional steel fabrication with{" "}
                <span className="text-white font-semibold">15+ years of excellence</span>.
                Serving Mumbai & Thane with precision engineering and dependable timelines.
              </p>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {["ISO Certified", "500+ Projects", "15+ Yrs", "5.0 ★"].map((t) => (
                  <span key={t}
                    className="text-[10px] font-bold text-gray-400 bg-gray-800/60
                      border border-gray-700/60 px-2.5 py-1 rounded-full uppercase
                      tracking-wider">
                    {t}
                  </span>
                ))}
              </div>

              {/* Socials */}
              <div className="flex items-center gap-2">
                {SOCIALS.map(({ href, label, icon: Icon, hover }) => (
                  <Link key={label} href={href} aria-label={label}
                    target="_blank" rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-xl bg-gray-800/80
                      border border-gray-700/50 text-gray-300
                      flex items-center justify-center
                      transition-all duration-200 hover:-translate-y-0.5
                      hover:text-white hover:shadow-lg hover:border-transparent
                      ${hover}`}>
                    <Icon className="text-base" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Quick Links (spans 2) ── */}
            <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black text-gray-500 uppercase
                tracking-[0.2em] mb-5">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}
                      className="group flex items-center gap-2 text-sm text-gray-400
                        hover:text-white transition-colors duration-150
                        focus-visible:outline-none focus-visible:text-white">
                      <FaChevronRight className="text-[8px] text-blue-600
                        group-hover:translate-x-0.5 transition-transform duration-150
                        flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services (spans 3) ── */}
            <div className="lg:col-span-3">
              <h4 className="text-[11px] font-black text-gray-500 uppercase
                tracking-[0.2em] mb-5">
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s}>
                    <Link href="/services"
                      className="group flex items-center gap-2 text-sm text-gray-400
                        hover:text-white transition-colors duration-150
                        focus-visible:outline-none focus-visible:text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600
                        flex-shrink-0 group-hover:bg-blue-400
                        transition-colors duration-150" />
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact (spans 3) ── */}
            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="text-[11px] font-black text-gray-500 uppercase
                tracking-[0.2em] mb-5">
                Contact Info
              </h4>
              <ul className="space-y-4">
                {CONTACT_ITEMS.map(({ icon: Icon, href, primary, secondary, label }) => {
                  const inner = (
                    <div className="flex items-start gap-3 group">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/10
                        border border-blue-500/20 flex items-center justify-center
                        flex-shrink-0 mt-0.5 group-hover:bg-blue-600/20
                        transition-colors duration-150">
                        <Icon className="text-blue-400 text-sm" aria-hidden />
                      </div>
                      <div>
                        <p className="text-sm text-gray-200 font-semibold leading-snug
                          group-hover:text-white transition-colors duration-150">
                          {primary}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{secondary}</p>
                      </div>
                    </div>
                  );

                  return (
                    <li key={primary}>
                      {href
                        ? <Link href={href} aria-label={label}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="focus-visible:outline-none focus-visible:ring-2
                              focus-visible:ring-blue-400 rounded-xl block">
                            {inner}
                          </Link>
                        : <div aria-label={label}>{inner}</div>
                      }
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-12 border-t border-gray-800/60 py-6">
            <div className="flex flex-col sm:flex-row items-center
              justify-between gap-3">

              <p className="text-xs text-gray-500 text-center sm:text-left">
                &copy; {new Date().getFullYear()}{" "}
                <span className="text-gray-300 font-semibold">
                  RN All Steel Fabrication Works
                </span>
                . All rights reserved.
              </p>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>Managed & Designed by</span>
                <Link
                  href="https://www.rbmstudios.co"
                  target="_blank" rel="noopener noreferrer"
                  aria-label="RBM Studios — opens in new tab"
                  className="inline-flex items-center gap-1 text-gray-300
                    font-semibold hover:text-blue-400 transition-colors duration-150">
                  RBM Studios
                  <HiArrowUpRight className="text-[10px] opacity-60" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating contact button — outside footer so z-index works */}
      <FloatingContact open={open} setOpen={setOpen} />
    </>
  );
}