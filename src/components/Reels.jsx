'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
  FaWhatsapp,
} from 'react-icons/fa';
import { REELS } from '@/data/reels';
import { pickActiveReel, visibleIndices } from '@/lib/reels';

/* Does this device have a real pointer? Decides hover-driven playback
   vs "whatever is on screen plays". Server renders the touch case. */
const HOVER_QUERY = '(hover: hover)';
const subscribeHover = (onChange) => {
  const mq = window.matchMedia(HOVER_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

/* How long a reel holds the spotlight when its video cannot tell us it
   ended (no source yet, or a stream that never fires `ended`). */
const FALLBACK_ROTATE_MS = 7000;

/* ═══════════════════════════════════════════════
   REEL CARD
   No thumbnail layer — the video itself is the
   card. It plays muted only while it is the active
   reel; everything else sits paused on frame one.
═══════════════════════════════════════════════ */
function ReelCard({
  reel,
  index,
  active,
  loop,
  onOpen,
  onHover,
  onLeave,
  onEnded,
  registerCard,
  registerVideo,
}) {
  const hasVideo = Boolean(reel.src);

  return (
    <li
      ref={(el) => registerCard(index, el)}
      className="w-[168px] shrink-0 snap-start sm:w-[210px] lg:w-[236px]"
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
        onFocus={() => onHover(index)}
        onBlur={onLeave}
        aria-label={`Open reel: ${reel.title}`}
        className={`group relative block w-full overflow-hidden rounded-[3px]
          bg-slate-900 ring-1 transition-all duration-300
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-blue-600
          ${active ? 'ring-blue-600' : 'ring-gray-200 hover:ring-slate-400'}`}
      >
        {/* 9:16 frame */}
        <div className="relative w-full pt-[177.78%]">
          {hasVideo ? (
            <video
              ref={(el) => registerVideo(index, el)}
              src={reel.src}
              /* Native poster only — it is the first painted frame while
                 the video decodes, not a thumbnail the viewer has to
                 click through. */
              poster={reel.poster}
              muted
              loop={loop}
              playsInline
              preload="metadata"
              onEnded={() => onEnded(index)}
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            /* Fallback for reels whose AWS URL has not been added yet —
               without this the card would be an empty box. */
            <Image
              src={reel.poster}
              alt={reel.title}
              fill
              sizes="(max-width: 640px) 168px, (max-width: 1024px) 210px, 236px"
              className="object-cover"
            />
          )}

          {/* Legibility gradient for the caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85
            via-transparent to-slate-950/25" />

          {/* Expand affordance — replaces the old play button, since the
              video is already playing on its own. */}
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center
            justify-center rounded-[2px] bg-white/90 opacity-0 transition-opacity
            duration-300 group-hover:opacity-100">
            <FaExpand className="text-[10px] text-slate-900" />
          </span>

          {/* Now-playing marker */}
          {active && hasVideo && (
            <span className="absolute left-3 top-3 flex items-center gap-1.5
              rounded-[2px] bg-blue-600 px-2 py-1">
              <span className="flex h-2.5 items-end gap-[2px]" aria-hidden>
                <span className="w-[2px] animate-[eq_0.9s_ease-in-out_infinite] bg-white"
                  style={{ height: '40%' }} />
                <span className="w-[2px] animate-[eq_0.9s_ease-in-out_0.15s_infinite] bg-white"
                  style={{ height: '100%' }} />
                <span className="w-[2px] animate-[eq_0.9s_ease-in-out_0.3s_infinite] bg-white"
                  style={{ height: '60%' }} />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em]
                text-white">
                Playing
              </span>
            </span>
          )}

          {!active && (
            <span className="absolute left-3 top-3 rounded-[2px] bg-slate-950/70
              px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]
              text-white/85 backdrop-blur-sm">
              {reel.category}
            </span>
          )}

          {/* Caption */}
          <span className="absolute inset-x-0 bottom-0 p-3 text-left">
            <span className="block text-[13px] font-semibold leading-snug text-white">
              {reel.title}
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase
              tracking-[0.14em] text-white/60">
              {reel.location}
            </span>
          </span>
        </div>
      </button>
    </li>
  );
}

/* ═══════════════════════════════════════════════
   FULLSCREEN PLAYER
═══════════════════════════════════════════════ */
function ReelPlayer({ reels, index, onClose, onNext, onPrev }) {
  const videoRef = useRef(null);
  const touchX = useRef(null);
  const [muted, setMuted] = useState(false);
  const reel = reels[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    const start = (e) => (touchX.current = e.touches?.[0]?.clientX ?? null);
    const end = (e) => {
      if (touchX.current == null) return;
      const d = touchX.current - (e.changedTouches?.[0]?.clientX ?? 0);
      if (Math.abs(d) > 48) (d > 0 ? onNext : onPrev)();
      touchX.current = null;
    };
    window.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('touchend', end, { passive: true });
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', end);
    };
  }, [onNext, onPrev]);

  /* Try with sound; fall back to muted if the browser blocks it. */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  if (!reel) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Reel: ${reel.title}`}
      className="fixed inset-0 z-[60] flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" onClick={onClose} />

      <button
        onClick={onClose}
        aria-label="Close reel"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center
          justify-center rounded-full border border-white/20 bg-white/10
          text-white transition-colors duration-200 hover:bg-white/20"
      >
        <FaTimes className="text-sm" />
      </button>

      <button
        onClick={onPrev}
        aria-label="Previous reel"
        className="absolute left-4 z-10 hidden h-11 w-11 items-center justify-center
          rounded-full border border-white/20 bg-white/10 text-white
          transition-colors duration-200 hover:bg-white/20 sm:flex"
      >
        <FaChevronLeft className="text-sm" />
      </button>
      <button
        onClick={onNext}
        aria-label="Next reel"
        className="absolute right-4 z-10 hidden h-11 w-11 items-center justify-center
          rounded-full border border-white/20 bg-white/10 text-white
          transition-colors duration-200 hover:bg-white/20 sm:flex"
      >
        <FaChevronRight className="text-sm" />
      </button>

      <div className="relative z-10 flex w-full max-w-[420px] flex-col px-4">
        <div
          className="relative w-full overflow-hidden rounded-[4px] bg-black"
          style={{ aspectRatio: '9 / 16', maxHeight: '82dvh' }}
        >
          {reel.src ? (
            <video
              ref={videoRef}
              src={reel.src}
              poster={reel.poster}
              controls
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <>
              <Image
                src={reel.poster}
                alt={reel.title}
                fill
                sizes="420px"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <p className="text-sm font-medium leading-relaxed text-white/80">
                  Video coming soon — meanwhile, see this work in our
                  <Link href="/projects" className="ml-1 underline underline-offset-4">
                    project gallery
                  </Link>
                  .
                </p>
              </div>
            </>
          )}

          {reel.src && (
            <button
              onClick={() => {
                const v = videoRef.current;
                if (!v) return;
                v.muted = !v.muted;
                setMuted(v.muted);
              }}
              aria-label={muted ? 'Unmute' : 'Mute'}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center
                rounded-full bg-slate-950/70 text-white backdrop-blur-sm
                transition-colors duration-200 hover:bg-slate-950"
            >
              {muted ? <FaVolumeMute className="text-xs" /> : <FaVolumeUp className="text-xs" />}
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{reel.title}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.16em] text-white/45">
              {reel.category} · {reel.location} · {index + 1} / {reels.length}
            </p>
          </div>
          <a
            href="https://wa.me/919665181246"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-[2px] bg-blue-600
              px-4 py-2.5 text-xs font-semibold text-white transition-colors
              duration-200 hover:bg-blue-700"
          >
            <FaWhatsapp className="text-sm" />
            Enquire
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION
═══════════════════════════════════════════════ */
export default function Reels() {
  const railRef = useRef(null);
  const cardEls = useRef([]);
  const videoEls = useRef([]);

  const [open, setOpen] = useState(-1);
  const [hovered, setHovered] = useState(-1);
  const [ratios, setRatios] = useState({});
  const [turn, setTurn] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const total = REELS.length;
  const hoverCapable = useSyncExternalStore(
    subscribeHover,
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false
  );

  const registerCard = useCallback((i, el) => { cardEls.current[i] = el; }, []);
  const registerVideo = useCallback((i, el) => { videoEls.current[i] = el; }, []);

  /* ── Which cards are actually on screen inside the rail ── */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const io = new IntersectionObserver(
      (entries) => {
        setRatios((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            const i = Number(entry.target.dataset.reelIndex);
            next[i] = entry.intersectionRatio;
          }
          return next;
        });
      },
      { root: rail, threshold: [0, 0.25, 0.5, 0.75, 0.9, 1] }
    );
    cardEls.current.forEach((el, i) => {
      if (!el) return;
      el.dataset.reelIndex = String(i);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  /* Cards considered "on screen", in left-to-right order. */
  const onScreen = useMemo(() => visibleIndices(ratios), [ratios]);

  /* The single card that plays right now — see src/lib/reels.js. */
  const activeIndex = useMemo(
    () => pickActiveReel({ hovered, ratios, onScreen, hoverCapable, turn }),
    [hovered, ratios, onScreen, hoverCapable, turn]
  );

  /* ── Drive playback: exactly one video plays, always muted ── */
  useEffect(() => {
    videoEls.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex && open === -1) {
        v.muted = true;
        const p = v.play();
        if (p?.catch) p.catch(() => {});
      } else {
        v.pause();
        if (v.currentTime > 0.05) v.currentTime = 0;
      }
    });
  }, [activeIndex, open]);

  /* Advance when the active reel finishes — but only if there is
     somewhere to advance TO. With one candidate (or no observer data at
     all) we replay instead, otherwise the rail freezes on a dead last
     frame and looks broken. */
  const handleEnded = useCallback(
    (i) => {
      if (i !== activeIndex) return;
      const canRotate = hoverCapable && hovered < 0 && onScreen.length > 1;
      if (canRotate) {
        setTurn((t) => t + 1);
        return;
      }
      const v = videoEls.current[i];
      if (!v) return;
      v.currentTime = 0;
      const p = v.play();
      if (p?.catch) p.catch(() => {});
    },
    [activeIndex, hoverCapable, hovered, onScreen.length]
  );

  /* Safety net for pointer devices: rotate even if `ended` never fires
     (no source yet, or a stream that does not report it). Touch devices
     do not rotate at all — the reel on screen simply loops. */
  useEffect(() => {
    if (!hoverCapable || hovered >= 0 || open > -1) return;
    const t = setInterval(() => setTurn((v) => v + 1), FALLBACK_ROTATE_MS);
    return () => clearInterval(t);
  }, [hoverCapable, hovered, open]);

  /* ── Rail arrows ── */
  const syncEdges = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  const scrollBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.offsetWidth + 16 : 240;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  const close = useCallback(() => setOpen(-1), []);
  const next = useCallback(() => setOpen((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setOpen((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    document.body.style.overflow = open > -1 ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <section id="reels" className="border-y border-gray-200 bg-slate-50
      py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HEADER ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              Reels
            </p>
            <h2 className="mt-6 text-3xl font-semibold leading-[1.12]
              tracking-[-0.02em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              Our work, in motion.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
              Short films from live sites across Mumbai, Thane &amp; Mumbra —
              fabrication, finishing and final installation, exactly as it happens
              in our workshop.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mr-1 hidden text-[11px] font-medium uppercase
              tracking-[0.18em] text-slate-400 sm:block">
              Hover to play · swipe to explore
            </span>
            <button
              onClick={() => scrollBy(-1)}
              disabled={edges.start}
              aria-label="Scroll reels left"
              className="flex h-11 w-11 items-center justify-center rounded-[2px]
                border border-gray-300 text-slate-700 transition-all duration-200
                hover:border-blue-600 hover:bg-blue-600 hover:text-white
                disabled:opacity-30 disabled:hover:border-gray-300
                disabled:hover:bg-transparent disabled:hover:text-slate-700"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={edges.end}
              aria-label="Scroll reels right"
              className="flex h-11 w-11 items-center justify-center rounded-[2px]
                border border-gray-300 text-slate-700 transition-all duration-200
                hover:border-blue-600 hover:bg-blue-600 hover:text-white
                disabled:opacity-30 disabled:hover:border-gray-300
                disabled:hover:bg-transparent disabled:hover:text-slate-700"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* ── RAIL — single line, horizontal scroll only ── */}
      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10
              bg-gradient-to-r from-slate-50 to-transparent transition-opacity
              duration-300 ${edges.start ? 'opacity-0' : 'opacity-100'}`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10
              bg-gradient-to-l from-slate-50 to-transparent transition-opacity
              duration-300 ${edges.end ? 'opacity-0' : 'opacity-100'}`}
          />

          <ul
            ref={railRef}
            onScroll={syncEdges}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto
              scroll-smooth pb-2"
          >
            {REELS.map((reel, i) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={i}
                active={i === activeIndex}
                /* Touch reels loop while on screen; on desktop only the
                   hovered card loops, so the rotation can move on. */
                loop={!hoverCapable || hovered === i}
                onOpen={setOpen}
                onHover={hoverCapable ? setHovered : () => {}}
                onLeave={hoverCapable ? () => setHovered(-1) : () => {}}
                onEnded={handleEnded}
                registerCard={registerCard}
                registerVideo={registerVideo}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* ── FOOTNOTE ── */}
      <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5
          border-t border-gray-200 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-600">
            Want your project filmed like this?{' '}
            <span className="font-semibold text-slate-900">
              We document every installation.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/rn_all_steel_fabrication/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] border
                border-gray-300 px-5 py-3 text-xs font-semibold uppercase
                tracking-[0.14em] text-slate-800 transition-colors duration-200
                hover:border-slate-900"
            >
              More on Instagram
            </a>
            <a
              href="https://wa.me/919665181246"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] bg-blue-600
                px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em]
                text-white transition-colors duration-200 hover:bg-blue-700"
            >
              <FaWhatsapp className="text-sm" />
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>

      {open > -1 && (
        <ReelPlayer
          reels={REELS}
          index={open}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </section>
  );
}
