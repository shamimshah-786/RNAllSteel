"use client"
import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHardHat,
  FaChevronUp,
  FaTimes,
  FaCommentDots,
} from "react-icons/fa";

/**
 * Footer with floating message button (bottom-left).
 *
 * - Removed newsletter / subscribe UI as requested.
 * - Added a floating message button at bottom-left that toggles a vertical
 *   stack of contact actions (WhatsApp and Call). The stack expands only
 *   upwards (no left/right expansion).
 * - When opened the message icon turns into a close icon.
 * - Uses next/link everywhere for navigational/external links (no raw <a> tags).
 * - Accessible: aria attributes, keyboard operable, focus styles.
 *
 * TailwindCSS expected for styling.
 */

export default function Footer() {
  const [open, setOpen] = useState(false);

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background pattern (non-interactive) */}
      <div aria-hidden className="absolute inset-0 opacity-30 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Decorative blurs */}
      <div aria-hidden className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />
      <div aria-hidden className="absolute -bottom-10 -right-10 w-60 h-60 rounded-full bg-blue-500/6 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand / About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <FaHardHat className="text-white text-xl" aria-hidden />
                </div>
                <div className="absolute -inset-1 bg-blue-500/10 rounded-xl blur-sm -z-10" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight">RN STEEL WORKS</h3>
                <p className="text-blue-300 font-semibold text-sm">Premium Steel Fabrication</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed text-base max-w-xl">
              Delivering professional steel fabrication with <strong className="text-white">15+ years of excellence</strong>.
              We serve Mumbai & Thane with precision engineering, quality materials and dependable timelines.
            </p>

            {/* Social + trust row */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3">
                <Link href="https://facebook.com" aria-label="Facebook">
                  <div className="group p-3 rounded-lg bg-gray-800/60 border border-gray-700/40 hover:bg-blue-700/90 transition transform hover:-translate-y-1 inline-flex">
                    <FaFacebook className="w-5 h-5 text-gray-200 group-hover:text-white" />
                  </div>
                </Link>

                <Link href="https://instagram.com" aria-label="Instagram">
                  <div className="group p-3 rounded-lg bg-gray-800/60 border border-gray-700/40 hover:bg-pink-500/90 transition transform hover:-translate-y-1 inline-flex">
                    <FaInstagram className="w-5 h-5 text-gray-200 group-hover:text-white" />
                  </div>
                </Link>

                <Link href="https://wa.me/+919665181246" aria-label="WhatsApp">
                  <div className="group p-3 rounded-lg bg-gray-800/60 border border-gray-700/40 hover:bg-green-600/90 transition transform hover:-translate-y-1 inline-flex">
                    <FaWhatsapp className="w-5 h-5 text-gray-200 group-hover:text-white" />
                  </div>
                </Link>
              </div>

              <div className="ml-3 text-sm text-gray-400">
                <span className="font-medium text-gray-200">ISO Certified</span>
                <span className="mx-2">•</span>
                <span>15+ years</span>
                <span className="mx-2">•</span>
                <span>500+ projects</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-label={link.label}>
                    <div className="flex items-center gap-3 text-sm hover:text-white transition transform hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" aria-hidden />
                      <span>{link.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="tel:+919665181246" aria-label="Call +91 96651 81246">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-blue-300" aria-hidden />
                    </div>
                    <div>
                      <div className="text-sm text-gray-100 font-semibold">+91 96651 81246</div>
                      <div className="text-xs text-gray-400">Call / WhatsApp</div>
                    </div>
                  </div>
                </Link>
              </li>

              <li>
                <Link href="mailto:rnallsteelfabrication@gmail.com" aria-label="Email rnallsteelfabrication@gmail.com">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-blue-300" aria-hidden />
                    </div>
                    <div>
                      <div className="text-sm text-gray-100">rnallsteelfabrication@gmail.com</div>
                      <div className="text-xs text-gray-400">General inquiries</div>
                    </div>
                  </div>
                </Link>
              </li>

              <li>
                <Link href="#" aria-label="Serving Mumbai & Thane">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-300" aria-hidden />
                    </div>
                    <div>
                      <div className="text-sm text-gray-100">Mumbai & Thane</div>
                      <div className="text-xs text-gray-400">On-site visits by appointment</div>
                    </div>
                  </div>
                </Link>
              </li>

              <li>
                <Link href="#" aria-label="Business hours Mon–Sun 9AM–9PM">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                      <FaClock className="text-blue-300" aria-hidden />
                    </div>
                    <div>
                      <div className="text-sm text-gray-100">Mon–Sun: 9AM–9PM</div>
                      <div className="text-xs text-gray-400">Emergency support available</div>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} <span className="text-white font-semibold">RN All Steel Fabrication Works</span>. All rights reserved.
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-400 block">Managed & Designed by</div>
              <Link href="https://rbmstudios.vercel.app" aria-label="RBM Studios (opens in new tab)">
                <div className="text-sm font-semibold text-gray-200 hover:text-white hover:underline active:underline transition">RBM Studios</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Message Button (bottom-left) */}
      <div className="fixed right-4 bottom-4 z-50 flex items-end pointer-events-none">
        {/* Expandable vertical stack — pointer-events enabled on interactive children only */}
        <div className="flex flex-col items-center mb-2 space-y-3 pointer-events-auto">
          {/* Contact action buttons (shown when open). They expand upward only. */}
          <div
            className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            aria-hidden={!open}
            style={{ transformOrigin: "center bottom" }}
          >
            {/* WhatsApp */}
            <Link href="https://wa.me/+919665181246" aria-label="WhatsApp">
              <div className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition transform hover:-translate-y-0.5">
                <FaWhatsapp />
              </div>
            </Link>

            {/* Call */}
            <Link href="tel:+919665181246" aria-label="Call">
              <div className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center text-white transition transform hover:-translate-y-0.5">
                <FaPhone />
              </div>
            </Link>
          </div>

          {/* Main toggle button (message icon -> close icon when open) */}
          <button
            type="button"
            aria-label={open ? "Close contact actions" : "Open contact actions"}
            onClick={() => setOpen((s) => !s)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            className="pointer-events-auto relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform hover:scale-105"
          >
            <span className="sr-only">{open ? "Close" : "Contact us"}</span>
            <div className="transform transition-transform duration-200">
              {open ? <FaTimes className="w-5 h-5" /> : <FaCommentDots className="w-5 h-5" />}
            </div>
            {/* small pulse when closed */}
            {!open && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60" />
            )}
          </button>
        </div>
      </div>
    </footer>
  );
}