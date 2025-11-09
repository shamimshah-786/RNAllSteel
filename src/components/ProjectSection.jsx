'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

/**
 * Featured Projects section with a professionally redesigned and responsive popup viewer.
 * - Fixes modal content getting cut off on small screens.
 * - The modal now uses a flexible layout that scrolls on mobile if content is tall.
 * - Retains accessibility features: keyboard navigation, focus management, and touch-swipe support.
 *
 * Usage: Import and render <FeaturedProjects /> on your home page.
 */

// A curated selection from your main `allProjects` list
const featuredProjects = [
  { id: 12, src: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp', title: 'Wrought Iron Designer Main Gate', category: 'Main Gates' },
  { id: 16, src: '/projects/railings/ss-balcony-railing-designer.webp', title: 'SS Balcony Railing with Designer Panels', category: 'Railings' },
  { id: 3, src: '/projects/window-grills/stainless-steel-window-grill-modern.webp', title: 'Modern Stainless Steel Window Grill', category: 'Window Grills' },
  { id: 13, src: '/projects/main-gates/laser-cut-steel-main-gate.webp', title: 'Modern Laser Cut Steel Main Gate', category: 'Main Gates' },
  { id: 17, src: '/projects/main-doors/ss-main-door-wooden-finish.webp', title: 'SS Main Door with Wooden Finish', category: 'Main Doors' },
  { id: 21, src: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp', title: 'Stainless Steel Mezzanine Railing', category: 'Railings' },
  { id: 8, src: '/projects/collapsible-gates/collapsible-steel-gate.webp', title: 'Collapsible Steel Gate', category: 'Collapsible Gates' },
  { id: 22, src: '/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg', title: 'SS Railings and Window Grills for Modern Bungalow', category: 'Railings' },
];

// Reusable, redesigned, and responsive modal component for the image viewer
function ProjectViewerModal({ projects, selectedIndex, onClose, onNext, onPrev }) {
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const project = projects[selectedIndex];

  // Handle keyboard navigation and focus trapping
  useEffect(() => {
    if (selectedIndex === -1) return;
    
    setIsMounted(true);
    setTimeout(() => closeButtonRef.current?.focus(), 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, onClose, onNext, onPrev]);

  // Handle touch swipe navigation
  useEffect(() => {
    const onTouchStart = (e) => touchStartX.current = e.touches?.[0]?.clientX ?? null;
    const onTouchEnd = (e) => {
      if (touchStartX.current == null) return;
      const endX = e.changedTouches?.[0]?.clientX ?? null;
      if (endX == null) return;
      const diff = touchStartX.current - endX;
      if (Math.abs(diff) > 40) { // Swipe threshold
        if (diff > 0) onNext(); else onPrev();
      }
      touchStartX.current = null;
    };
    if (selectedIndex !== -1) {
      window.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchend', onTouchEnd, { passive: true });
    }
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [selectedIndex, onNext, onPrev]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${project.title}`}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Main viewer card with animation and responsive layout */}
      <div className={`relative z-10 w-full max-w-6xl max-h-[90vh] rounded-2xl bg-slate-800 ring-1 ring-white/10 shadow-2xl transition-all duration-300 flex flex-col md:flex-row ${isMounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Close Button - positioned relative to the card */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close viewer"
          className="absolute -top-3 -right-3 z-20 bg-slate-700 text-white rounded-full p-2 shadow-lg hover:bg-slate-600 transition"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        {/* Image Display Area (Left side on desktop) */}
        <div className="relative w-full md:w-8/12 bg-black/20 md:rounded-l-2xl flex items-center justify-center p-4">
          <div className="relative w-full  max-h-[50vh] h-[300px] md:h-[400px] lg:h-[500px] md:max-h-[80vh]">
            <Image
              src={project.src}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-contain"
              priority
            />
          </div>
           {/* Prev/Next buttons on top of the image */}
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-3 hover:bg-black/50 transition"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-3 hover:bg-black/50 transition"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Info Panel (Right side on desktop) */}
        <div className="w-full md:w-4/12 p-6 flex flex-col overflow-y-auto">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-sky-300 mt-1">{project.category}</p>
          <p className="text-xs text-slate-400 mt-4">
            {selectedIndex + 1} of {projects.length}
          </p>

          <div className="mt-6 hidden md:block border-t border-slate-700 pt-6 text-sm text-slate-300">
            <p>High-quality fabrication tailored to your exact specifications. This project showcases our expertise in {project.category.toLowerCase()}.</p>
          </div>
          
          <div className="mt-auto pt-6 space-y-3">
            <a 
              href="/contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              Request a Quote
            </a>
            <Link 
              href="/projects"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-slate-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-600 transition"
            >
              View All Projects <FaExternalLinkAlt className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProjectCard({ project, onClick, priority }) {
  return (
    <button
      onClick={onClick}
      className="group relative block w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300"
      aria-label={`View project: ${project.title}`}
    >
      <div className="relative w-full pt-[125%] bg-slate-100">
        <Image
          src={project.src}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/_next/image/placeholder.png"
          priority={priority}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
        <h3 className="text-white text-base font-semibold line-clamp-2">{project.title}</h3>
        <p className="text-sm text-sky-200 mt-1">{project.category}</p>
      </div>
    </button>
  );
}

export default function FeaturedProjects() {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const totalProjects = featuredProjects.length;

  const openViewer = (index) => setSelectedIndex(index);
  const closeViewer = () => setSelectedIndex(-1);
  const showNext = () => setSelectedIndex((i) => (i + 1) % totalProjects);
  const showPrev = () => setSelectedIndex((i) => (i - 1 + totalProjects) % totalProjects);

  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex > -1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 mb-4">
            Our Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            A Glimpse of Our Projects
          </h2>
          <div className="mt-3 mx-auto h-1 w-24 rounded bg-gradient-to-r from-blue-600 to-sky-600" />
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            From residential railings to large-scale industrial structures, our work speaks for itself. Explore a selection of projects showcasing our commitment to quality.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {featuredProjects.map((project, idx) => (
            <div key={project.id} className="break-inside-avoid">
              <ProjectCard
                project={project}
                onClick={() => openViewer(idx)}
                priority={idx < 4}
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-br from-blue-600 to-sky-600 px-6 py-3 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-sky-700 transition-transform active:scale-95"
          >
            View All Projects
          </Link>
        </div>
      </div>

      {/* Render the modal */}
      {selectedIndex > -1 && (
        <ProjectViewerModal
          projects={featuredProjects}
          selectedIndex={selectedIndex}
          onClose={closeViewer}
          onNext={showNext}
          onPrev={showPrev}
        />
      )}
    </section>
  );
}