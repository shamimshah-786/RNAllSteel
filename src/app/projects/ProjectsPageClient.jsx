'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

/**
 * Projects gallery - fixes reported issues:
 * - Lightbox on small screens: footer buttons (Request / Download) were pushed off-screen.
 *   Now the viewer uses a responsive layout where the image container height is calculated
 *   to leave space for the header+footer. Footer is sticky inside the viewer so buttons are
 *   always visible on small screens.
 * - Black area / blank image in lightbox: ensured Next/Image fill parent has explicit height
 *   and used object-contain. The container uses max heights to fit viewport.
 * - Thumbnail cards: removed negative margin approach that caused inconsistent bottom spacing.
 *   Overlay with title/category is positioned absolutely so thumbnails have no extra blank space.
 * - Added safe guards for zero-length arrays and restored body scroll handling consistently.
 *
 * Usage:
 * - Place this file at app/components/Projects.jsx
 * - Keep project images in /public as referenced in `allProjects`.
 * - Tailwind CSS must be configured in your project.
 */

/* Project data (same as provided) */
const allProjects = [
  { id: 1, src: '/projects/main-gates/ms-decorative-main-gate-house.webp', title: 'Mild Steel Decorative Main Gate', category: 'Main Gates' },
  { id: 2, src: '/projects/street-stalls/stainless-steel-food-cart-stall.webp', title: 'Stainless Steel Food Stalls', category: 'Street Stalls' },
  { id: 3, src: '/projects/window-grills/stainless-steel-window-grill-modern.webp', title: 'Modern Stainless Steel Window Grill', category: 'Window Grills' },
  { id: 4, src: '/projects/main-gates/stainless-steel-main-gate-house.webp', title: 'Stainless Steel Main Gate', category: 'Main Gates' },
  { id: 5, src: '/projects/railings/stainless-steel-staircase-railing.webp', title: 'Stainless Steel Staircase Railing', category: 'Railings' },
  { id: 6, src: '/projects/window-grills/designer-ss-window-grill.webp', title: 'Designer Stainless Steel Window Grill', category: 'Window Grills' },
  { id: 7, src: '/projects/railings/steel-staircase-railing.webp', title: 'Steel Staircase Railing', category: 'Railings' },
  { id: 8, src: '/projects/collapsible-gates/collapsible-steel-gate.webp', title: 'Collapsible Steel Gate', category: 'Collapsible Gates' },
  { id: 9, src: '/projects/main-doors/ss-designer-main-door.webp', title: 'Stainless Steel Designer Main Door', category: 'Main Doors' },
  { id: 10, src: '/projects/railings/ss-staircase-railing-decorative-pillars.webp', title: 'SS Staircase Railing with Decorative Pillars', category: 'Railings' },
  { id: 11, src: '/projects/main-gates/ss-staircase-safety-gate.webp', title: 'Stainless Steel Staircase Safety Gate', category: 'Main Gates' },
  { id: 12, src: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp', title: 'Wrought Iron Designer Main Gate with Gold Finish', category: 'Main Gates' },
  { id: 13, src: '/projects/main-gates/laser-cut-steel-main-gate.webp', title: 'Modern Laser Cut Steel Main Gate', category: 'Main Gates' },
  { id: 14, src: '/projects/main-gates/ms-sliding-main-gate-laser-cut.webp', title: 'Modern Mild Steel Sliding Main Gate with Laser Cut Panel', category: 'Main Gates' },
  { id: 15, src: '/projects/collapsible-gates/collapsible-steel-window-gate.webp', title: 'Collapsible Steel Window Gate', category: 'Collapsible Gates' },
  { id: 16, src: '/projects/railings/ss-balcony-railing-designer.webp', title: 'SS Balcony Railing with Designer Panels', category: 'Railings' },
  { id: 17, src: '/projects/main-doors/ss-main-door-wooden-finish.webp', title: 'SS Main Door with Wooden Finish', category: 'Main Doors' },
  { id: 18, src: '/projects/window-grills/ss-window-grill-apartment.webp', title: 'Stainless Steel Window Grill for Apartment', category: 'Window Grills' },
  { id: 19, src: '/projects/main-gates/ss-swing-compound-main-gate.webp', title: 'SS Swing Main Gate with Decorative Design', category: 'Main Gates' },
  { id: 20, src: '/projects/railings/ss-balcony-railing-curved-design.webp', title: 'Stainless Steel Balcony Railing with Curved Design', category: 'Railings' },
  { id: 21, src: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp', title: 'Stainless Steel Mezzanine Railing with Metal Staircase', category: 'Railings' },
  { id: 22, src: '/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg', title: 'SS Railings and Window Grills for Modern Bungalow', category: 'Railings' },
];

export default function Projects() {
  const imagesPerLoad = 12;
  const [visibleCount, setVisibleCount] = useState(imagesPerLoad);
  const [selectedIndex, setSelectedIndex] = useState(-1); // index inside visibleProjects
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const viewerCloseButtonRef = useRef(null);
  const lastActiveElementRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    // restore scroll if component unmounts while viewer open
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const visibleProjects = useMemo(() => allProjects.slice(0, visibleCount), [visibleCount]);
  const hasMore = visibleCount < allProjects.length;

  const openViewer = (index) => {
    if (!visibleProjects || visibleProjects.length === 0) return;
    lastActiveElementRef.current = document.activeElement;
    setSelectedIndex(index);
    // disable body scroll
    document.body.style.overflow = 'hidden';
    // focus close after render
    setTimeout(() => viewerCloseButtonRef.current?.focus?.(), 80);
  };

  const closeViewer = () => {
    setSelectedIndex(-1);
    document.body.style.overflow = '';
    setTimeout(() => lastActiveElementRef.current?.focus?.(), 50);
  };

  const showNext = () => {
    if (!visibleProjects || visibleProjects.length === 0) return;
    setSelectedIndex((prev) => (visibleProjects.length ? (prev + 1) % visibleProjects.length : -1));
  };

  const showPrev = () => {
    if (!visibleProjects || visibleProjects.length === 0) return;
    setSelectedIndex((prev) => (visibleProjects.length ? (prev - 1 + visibleProjects.length) % visibleProjects.length : -1));
  };

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === -1) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, visibleProjects.length]);

  // touch swipe support for viewer
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartX.current = e.touches?.[0]?.clientX ?? null;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current == null) return;
      const endX = e.changedTouches?.[0]?.clientX ?? null;
      if (endX == null) return;
      const diff = touchStartX.current - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showNext();
        else showPrev();
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
  }, [selectedIndex, visibleProjects.length]);

  const loadMore = async () => {
    if (!hasMore) return;
    setIsLoadingMore(true);
    await new Promise((res) => setTimeout(res, 500));
    setVisibleCount((c) => Math.min(allProjects.length, c + imagesPerLoad));
    setIsLoadingMore(false);
  };

  const skeletons = new Array(6).fill(0);

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900">Our Projects</h2>
          <div className="mt-3 mx-auto h-1 w-28 rounded bg-gradient-to-r from-blue-600 to-sky-600" />
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto px-2">
            Explore a curated portfolio of our steel fabrication work across Mumbai & Thane — gates, railings, grills and more.
          </p>
        </div>

        {/* Masonry using CSS columns */}
        <div className="mx-auto" aria-live="polite">
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {visibleProjects.map((project, idx) => (
              <article key={project.id} className="break-inside-avoid mb-4">
                <button
                  onClick={() => openViewer(idx)}
                  className="group relative block w-full text-left rounded-xl overflow-hidden shadow-sm hover:shadow-lg transform transition duration-300 bg-white"
                  aria-label={`${project.title} — open viewer`}
                >
                  {/* Image wrapper: fixed aspect so thumbnails align */}
                  <div className="relative w-full aspect-[3/4] bg-gray-100">
                    <Image
                      src={project.src}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      placeholder="blur"
                      blurDataURL="/_next/image/placeholder.png"
                      priority={idx < 4}
                    />
                  </div>

                  {/* Overlay positioned absolute — no negative margins */}
                  <div className="absolute left-0 right-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-sm md:text-base text-white font-semibold line-clamp-2">{project.title}</h3>
                    <div className="mt-1 text-xs text-sky-200">{project.category}</div>
                  </div>
                </button>
              </article>
            ))}

            {isLoadingMore && skeletons.map((_, i) => (
              <div key={`s-${i}`} className="break-inside-avoid mb-4 animate-pulse">
                <div className="w-full aspect-[3/4] rounded-xl bg-gray-200" />
                <div className="h-10 mt-3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Load more / finished */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {hasMore ? (
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-br from-blue-600 to-sky-600 px-6 py-3 text-white font-semibold shadow hover:from-blue-700 hover:to-sky-700 transition-transform active:scale-95"
              aria-label="Load more projects"
            >
              {isLoadingMore ? 'Loading...' : `Load More (${allProjects.length - visibleProjects.length} remaining)`}
            </button>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-md text-center max-w-xl">
              <h4 className="text-lg font-semibold text-slate-900">You've reached the end</h4>
              <p className="text-slate-600 mt-2">Interested in a custom project? <a href="/contact" className="text-blue-600 font-medium">Get a quote</a></p>
            </div>
          )}

          <p className="text-sm text-slate-500 mt-2">
            Showing {visibleProjects.length} of {allProjects.length} projects
          </p>
        </div>

        {/* Lightbox / Viewer */}
        {selectedIndex > -1 && visibleProjects[selectedIndex] && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${visibleProjects[selectedIndex].title} preview`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeViewer}
            />

            {/* viewer card */}
            <div className="relative z-10 w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden bg-white flex flex-col">
              {/* header */}
              <div className="flex items-center justify-between p-3 md:p-4 border-b flex-shrink-0">
                <div className="flex flex-col">
                  <div className="text-sm md:text-base hidden sm:block font-semibold text-slate-900">{visibleProjects[selectedIndex].title}</div>
                  <div className="text-xs text-slate-500">{visibleProjects[selectedIndex].category}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm text-slate-500 mr-2">{selectedIndex + 1} / {visibleProjects.length}</div>

                  <button
                    ref={viewerCloseButtonRef}
                    onClick={closeViewer}
                    className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-label="Close viewer"
                  >
                    <IoMdClose className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* image area: calculate available height by subtracting header+footer (flex layout) */}
              <div className="flex-1 overflow-hidden bg-black/90 flex items-center justify-center">
                {/* Prev (desktop) */}
                <button
                  onClick={showPrev}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 hidden md:inline-flex items-center justify-center rounded-full bg-black/40 p-3 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <FaChevronLeft className="h-5 w-5 text-white" />
                </button>

                {/* Next (desktop) */}
                <button
                  onClick={showNext}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 hidden md:inline-flex items-center justify-center rounded-full bg-black/40 p-3 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <FaChevronRight className="h-5 w-5 text-white" />
                </button>

                {/* Image container: ensure explicit max height so Next/Image fill renders */}
                <div className="relative w-full max-w-5xl max-h-[calc(90vh-128px)] p-4">
                  <div className="relative w-full h-[400px] sm:h-[450px] md:h-[600px]">
                    <Image
                      src={visibleProjects[selectedIndex].src}
                      alt={visibleProjects[selectedIndex].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1200px"
                      className="object-contain"
                      priority
                      placeholder="blur"
                      blurDataURL="/_next/image/placeholder.png"
                    />
                  </div>
                </div>
              </div>

              {/* footer sticky inside the viewer so it remains visible on small screens */}
              <div className="flex-shrink-0 border-t bg-white p-3 md:p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm text-slate-700">{visibleProjects[selectedIndex].title}</div>

                  <div className="flex items-center gap-3 justify-end">
                    <a
                      href="/contact"
                      className="rounded-md bg-gradient-to-br from-blue-600 to-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-sky-700"
                    >
                      Request Quote
                    </a>
                    <a
                      href={visibleProjects[selectedIndex].src}
                      download
                      className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      aria-label="Download image"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}