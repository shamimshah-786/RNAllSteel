"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowRight,
  FaWhatsapp,
  FaPhone,
  FaPlay,
} from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

const featuredProjects = [
  { id: 12, src: "/projects/main-gates/wrought-iron-designer-main-gate-gold.webp",   title: "Wrought Iron Designer Main Gate",                 category: "Main Gates",        tag: "Residential" },
  { id: 16, src: "/projects/railings/ss-balcony-railing-designer.webp",              title: "SS Balcony Railing with Designer Panels",          category: "Railings",          tag: "Luxury" },
  { id: 3,  src: "/projects/window-grills/stainless-steel-window-grill-modern.webp", title: "Modern Stainless Steel Window Grill",              category: "Window Grills",     tag: "Modern" },
  { id: 13, src: "/projects/main-gates/laser-cut-steel-main-gate.webp",              title: "Modern Laser Cut Steel Main Gate",                 category: "Main Gates",        tag: "Custom" },
  { id: 17, src: "/projects/main-doors/ss-main-door-wooden-finish.webp",             title: "SS Main Door with Wooden Finish",                  category: "Main Doors",        tag: "Premium" },
  { id: 21, src: "/projects/railings/ss-mezzanine-railing-metal-stairs.webp",        title: "Stainless Steel Mezzanine Railing",                category: "Railings",          tag: "Industrial" },
  { id: 8,  src: "/projects/collapsible-gates/collapsible-steel-gate.webp",          title: "Collapsible Steel Gate",                          category: "Collapsible Gates", tag: "Security" },
  { id: 22, src: "/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg",  title: "SS Railings & Window Grills for Bungalow",         category: "Railings",          tag: "Bungalow" },
];

/* ══════════════════════════ MODAL ══════════════════════════ */
function Modal({ projects, index, onClose, onNext, onPrev }) {
  const closeRef = useRef(null);
  const touchX   = useRef(null);
  const [show, setShow] = useState(false);
  const p = projects[index];

  useEffect(() => { const id = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(id); }, []);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const s = (e) => (touchX.current = e.touches?.[0]?.clientX ?? null);
    const e = (ev) => {
      if (!touchX.current) return;
      const d = touchX.current - (ev.changedTouches?.[0]?.clientX ?? 0);
      if (Math.abs(d) > 44) d > 0 ? onNext() : onPrev();
      touchX.current = null;
    };
    window.addEventListener("touchstart", s, { passive: true });
    window.addEventListener("touchend",   e, { passive: true });
    return () => { window.removeEventListener("touchstart", s); window.removeEventListener("touchend", e); };
  }, [onNext, onPrev]);

  useEffect(() => { const t = setTimeout(() => closeRef.current?.focus(), 80); return () => clearTimeout(t); }, [index]);

  if (!p) return null;

  return (
    <div
      role="dialog" aria-modal="true" aria-label={`Viewing: ${p.title}`}
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className={`relative z-10 w-full sm:max-w-5xl sm:mx-4 bg-white sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-300 ${show ? "translate-y-0 scale-100" : "translate-y-8 sm:scale-95"}`}
        style={{ maxHeight: "92dvh" }}>

        {/* Image side */}
        <div className="relative w-full md:w-[55%] flex-shrink-0 bg-gray-100 overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: "clamp(280px, 65vw, 540px)" }}>
            <Image src={p.src} alt={p.title} fill sizes="(max-width:768px) 100vw, 55vw" className="object-cover" priority />
          </div>
          {/* Gradient bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Nav arrows */}
          <button onClick={onPrev} aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
            <FaChevronLeft className="text-sm" />
          </button>
          <button onClick={onNext} aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md transition-all duration-200">
            <FaChevronRight className="text-sm" />
          </button>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 flex items-end justify-between">
            <div>
              <span className="inline-block bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1.5">
                {p.category}
              </span>
              <p className="text-white font-bold text-base leading-snug drop-shadow">{p.title}</p>
            </div>
            <span className="text-white/60 text-xs font-bold tabular-nums flex-shrink-0 ml-3">
              {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Info side */}
        <div className="flex flex-col w-full md:w-[45%] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em]">
                Project Details
              </span>
            </div>
            <button ref={closeRef} onClick={onClose} aria-label="Close"
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-150">
              <FaTimes className="text-gray-500 text-xs" />
            </button>
          </div>

          <div className="flex-1 px-6 py-5 space-y-5">
            {/* Tag + title */}
            <div>
              <span className="inline-block text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full mb-2">
                {p.tag}
              </span>
              <h3 className="text-xl font-bold text-gray-900 leading-snug">{p.title}</h3>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              Precision-fabricated <strong className="text-gray-700 font-semibold">{p.category.toLowerCase()}</strong> using
              premium SS 304 / mild steel. Finished to the highest standards — built to last, designed to impress.
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { k: "Material",   v: "SS 304 / MS" },
                { k: "Finish",     v: "Mirror / Matte" },
                { k: "Lead Time",  v: "15–20 Days" },
                { k: "Warranty",   v: "2 Years" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-3">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{s.k}</p>
                  <p className="text-sm font-bold text-gray-800">{s.v}</p>
                </div>
              ))}
            </div>

            {/* Filmstrip */}
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2.5">More Work</p>
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {projects.map((proj, i) => (
                  <button key={proj.id} onClick={() => { const d = i - index; if (!d) return; const fn = d > 0 ? onNext : onPrev; for (let x = 0; x < Math.abs(d); x++) fn(); }}
                    aria-label={proj.title}
                    className={`relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === index ? "border-blue-600 ring-2 ring-blue-200" : "border-gray-200 opacity-50 hover:opacity-80"}`}>
                    <Image src={proj.src} alt={proj.title} fill sizes="44px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="px-6 py-5 border-t border-gray-100 space-y-2.5">
            <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold text-sm transition-colors duration-200 shadow-md">
              <FaWhatsapp className="text-green-300 text-base" />
              Request Similar Work
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a href="tel:+919665181246"
                className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200">
                <FaPhone className="text-xs" /> Call Now
              </a>
              <Link href="/projects"
                className="inline-flex items-center justify-center gap-1.5 border border-gray-200 hover:border-gray-400 text-gray-700 px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200">
                All Projects <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ CARD VARIANTS ══════════════════════════ */

/* Large hero card — landscape, used for featured slot */
function HeroCard({ project, onClick, priority }) {
  return (
    <button onClick={onClick} aria-label={`View: ${project.title}`}
      className="group relative block w-full rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
      <div className="relative w-full pt-[58%] bg-gray-200">
        <Image src={project.src} alt={project.title} fill
          sizes="(max-width:768px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority={priority} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/10 to-transparent" />
      {/* Hover tint */}
      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Arrow badge top-right on hover */}
      <div className="absolute top-4 right-4 w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
        <HiArrowUpRight className="text-gray-900 text-sm" />
      </div>
      {/* Category */}
      <div className="absolute top-4 left-4">
        <span className="inline-block bg-white text-gray-900 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
          {project.category}
        </span>
      </div>
      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-white font-bold text-lg sm:text-xl leading-snug drop-shadow-sm">
          {project.title}
        </p>
        <p className="mt-1.5 text-white/60 text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="w-4 h-px bg-blue-400" />
          View Project
        </p>
      </div>
    </button>
  );
}

/* Small square card */
function SmallCard({ project, onClick, priority }) {
  return (
    <button onClick={onClick} aria-label={`View: ${project.title}`}
      className="group relative block w-full rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
      <div className="relative w-full pt-[110%] bg-gray-200">
        <Image src={project.src} alt={project.title} fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          priority={priority} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/5 to-transparent" />
      <div className="absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-3 right-3 w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <HiArrowUpRight className="text-gray-900 text-xs" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <span className="inline-block text-[9px] font-bold text-white/70 uppercase tracking-wider mb-1">
          {project.category}
        </span>
        <p className="text-white font-semibold text-sm leading-snug line-clamp-2">
          {project.title}
        </p>
      </div>
    </button>
  );
}

/* ══════════════════════════ MAIN ══════════════════════════ */
export default function FeaturedProjects() {
  const [idx, setIdx] = useState(-1);
  const total = featuredProjects.length;

  const open  = useCallback((i) => setIdx(i), []);
  const close = useCallback(() => setIdx(-1), []);
  const next  = useCallback(() => setIdx((i) => (i + 1) % total), [total]);
  const prev  = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    document.body.style.overflow = idx > -1 ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [idx]);

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-14">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2.5 text-blue-600 text-xs font-extrabold uppercase tracking-[0.22em] mb-5">
              <span className="w-8 h-[2px] bg-blue-600 rounded-full" />
              Our Work
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.08]">
              500+ Projects.
              <br />
              <span className="text-blue-600">One Standard.</span>
              <br />
              Excellence.
            </h2>
            <p className="mt-4 text-gray-500 text-base leading-relaxed">
              Every project below was designed, fabricated, and installed by
              our team — across homes and commercial sites in Mumbai &amp; Thane.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end flex-shrink-0">
            {/* Stats strip */}
            <div className="flex items-stretch gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {[
                { v: "500+", l: "Projects" },
                { v: "15+",  l: "Years" },
                { v: "5.0★", l: "Rating" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center justify-center bg-white px-5 py-3 first:rounded-l-2xl last:rounded-r-2xl">
                  <p className="text-lg font-bold text-gray-900 tabular-nums leading-none">{s.v}</p>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5 uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>

            <Link href="/projects"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200 group">
              Full Portfolio
              <HiArrowUpRight className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* ── GRID ── */}
        {/* Layout:
            Row 1: [Hero ×2 cols] [Small] [Small]
            Row 2: [Small] [Small] [Hero ×2 cols]
            Row 3: [Small] [Small] [CTA ×2 cols]         */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

          {/* R1 */}
          <div className="col-span-2">
            <HeroCard project={featuredProjects[0]} onClick={() => open(0)} priority />
          </div>
          <div className="col-span-1">
            <SmallCard project={featuredProjects[1]} onClick={() => open(1)} priority />
          </div>
          <div className="col-span-1">
            <SmallCard project={featuredProjects[2]} onClick={() => open(2)} priority />
          </div>

          {/* R2 */}
          <div className="col-span-1">
            <SmallCard project={featuredProjects[3]} onClick={() => open(3)} />
          </div>
          <div className="col-span-1">
            <SmallCard project={featuredProjects[4]} onClick={() => open(4)} />
          </div>
          <div className="col-span-2">
            <HeroCard project={featuredProjects[5]} onClick={() => open(5)} />
          </div>

          {/* R3 */}
          <div className="col-span-1">
            <SmallCard project={featuredProjects[6]} onClick={() => open(6)} />
          </div>
          <div className="col-span-1">
            <SmallCard project={featuredProjects[7]} onClick={() => open(7)} />
          </div>

          {/* CTA TILE */}
          <div className="col-span-2 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-6 sm:p-8 flex flex-col justify-between min-h-[200px]">
            <div>
              <span className="inline-block text-[10px] font-extrabold text-blue-600 uppercase tracking-[0.2em] mb-3">
                Get Started Today
              </span>
              <p className="text-gray-900 font-bold text-xl sm:text-2xl leading-snug max-w-xs">
                Want work like this at your home or office?
              </p>
              <p className="mt-2 text-gray-500 text-sm">
                Free site visit · Transparent pricing · Mumbai &amp; Thane
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 mt-6">
              <a href="https://wa.me/919665181246" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200 shadow-md">
                <FaWhatsapp className="text-green-300 text-base" />
                WhatsApp Now
              </a>
              <a href="tel:+919665181246"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-blue-700 px-5 py-3 rounded-xl font-bold text-sm transition-colors duration-200">
                <FaPhone className="text-xs" />
                Call Direct
              </a>
            </div>
          </div>

        </div>
      </div>

      {idx > -1 && (
        <Modal projects={featuredProjects} index={idx}
          onClose={close} onNext={next} onPrev={prev} />
      )}
    </section>
  );
}