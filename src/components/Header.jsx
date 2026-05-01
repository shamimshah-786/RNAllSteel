'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaBars, FaTimes, FaPhone, FaWhatsapp, FaEnvelope,
  FaHome, FaTools, FaFolderOpen, FaChevronDown,
  FaDoorOpen, FaGripHorizontal, FaShieldAlt, FaStore,
  FaRss, FaLightbulb, FaHardHat, FaLayerGroup,
} from 'react-icons/fa';
import { HiArrowUpRight } from 'react-icons/hi2';

/* ═══════════════════════════════════════════════
   MEGA MENU DATA
═══════════════════════════════════════════════ */
const SERVICES_MENU = {
  label: 'Services',
  href: '/services',
  cols: [
    {
      heading: 'Gates & Doors',
      items: [
        { icon: FaShieldAlt,     label: 'Main Gates',        href: '/services#main-gates',        desc: 'MS & SS designer gates' },
        { icon: FaGripHorizontal,label: 'Collapsible Gates', href: '/services#collapsible-gates', desc: 'Space-saving security gates' },
        { icon: FaDoorOpen,      label: 'Main Doors',        href: '/services#main-doors',        desc: 'Steel & SS door designs' },
      ],
    },
    {
      heading: 'Railings & Grills',
      items: [
        { icon: FaLayerGroup,    label: 'Railings',          href: '/services#railings',          desc: 'Staircase & balcony railings' },
        { icon: FaGripHorizontal,label: 'Window Grills',     href: '/services#window-grills',     desc: 'Modern designer grills' },
      ],
    },
    {
      heading: 'Commercial',
      items: [
        { icon: FaStore,         label: 'Street Stalls',     href: '/services#street-stalls',     desc: 'Food carts & vendor stalls' },
        { icon: FaTools,         label: 'Custom Fabrication',href: '/services#custom',            desc: 'Any design, any material' },
      ],
    },
  ],
  cta: { label: 'View All Services', href: '/services' },
};

const BLOG_MENU = {
  label: 'Blog',
  href: '/blog',
  cols: [
    {
      heading: 'Popular Topics',
      items: [
        { icon: FaHardHat,    label: 'Railings Guide',    href: '/blog?category=Railings',          desc: 'Design & installation tips' },
        { icon: FaShieldAlt,  label: 'Main Gates',        href: '/blog?category=Main+Gates',        desc: 'Styles, sizes & security' },
        { icon: FaGripHorizontal, label: 'Window Grills', href: '/blog?category=Window+Grills',     desc: 'Patterns & comparisons' },
      ],
    },
    {
      heading: 'Resources',
      items: [
        { icon: FaLightbulb,  label: 'Tips & Care',       href: '/blog?category=Tips+%26+Care',     desc: 'Maintain your steelwork' },
        { icon: FaRss,        label: 'All Articles',       href: '/blog',                            desc: 'Browse every guide' },
      ],
    },
  ],
  cta: { label: 'Go to Blog', href: '/blog' },
};

/* ═══════════════════════════════════════════════
   DESKTOP NAV ITEMS
═══════════════════════════════════════════════ */
const NAV_ITEMS = [
  { href: '/',        label: 'Home' },
  { href: '/about',   label: 'About' },
  { ...SERVICES_MENU },
  { href: '/projects',label: 'Projects' },
  { ...BLOG_MENU },
  { href: '/contact', label: 'Contact' },
];

/* ═══════════════════════════════════════════════
   MOBILE SIDEBAR ITEMS (flat + expandable)
═══════════════════════════════════════════════ */
const SIDEBAR_ITEMS = [
  { href: '/',         label: 'Home',     icon: FaHome },
  { href: '/about',    label: 'About',    icon: FaTools },
  {
    label: 'Services', icon: FaTools,
    children: SERVICES_MENU.cols.flatMap((c) => c.items),
  },
  { href: '/projects', label: 'Projects', icon: FaFolderOpen },
  {
    label: 'Blog',     icon: FaRss,
    children: BLOG_MENU.cols.flatMap((c) => c.items),
  },
  { href: '/contact',  label: 'Contact',  icon: FaEnvelope },
];

/* ═══════════════════════════════════════════════
   MEGAMENU PANEL
═══════════════════════════════════════════════ */
function MegaMenu({ menu, onClose }) {
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
        bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-gray-200/60
        overflow-hidden w-max max-w-2xl"
      onMouseLeave={onClose}
      role="region"
      aria-label={`${menu.label} submenu`}
    >
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className={`grid gap-0 divide-x divide-gray-100
        grid-cols-${menu.cols.length}`}
        style={{ gridTemplateColumns: `repeat(${menu.cols.length}, minmax(0, 1fr))` }}>
        {menu.cols.map((col) => (
          <div key={col.heading} className="p-5">
            <p className="text-[10px] font-black text-gray-400 uppercase
              tracking-[0.2em] mb-3.5 px-1">
              {col.heading}
            </p>
            <ul className="space-y-0.5">
              {col.items.map(({ icon: Icon, label, href, desc }) => (
                <li key={href}>
                  <Link href={href} onClick={onClose}
                    className="group flex items-start gap-3 px-2.5 py-2.5 rounded-xl
                      hover:bg-blue-50 transition-colors duration-150
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-blue-500">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100
                      flex items-center justify-center flex-shrink-0 mt-0.5
                      group-hover:bg-blue-600 group-hover:border-blue-600
                      transition-colors duration-150">
                      <Icon className="text-blue-600 text-xs
                        group-hover:text-white transition-colors duration-150" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900
                        group-hover:text-blue-700 transition-colors duration-150 leading-none mb-0.5">
                        {label}
                      </p>
                      <p className="text-[11px] text-gray-400 leading-snug">{desc}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA footer */}
      <div className="border-t border-gray-100 px-5 py-3 bg-gray-50/50">
        <Link href={menu.cta.href} onClick={onClose}
          className="inline-flex items-center gap-1.5 text-xs font-bold
            text-blue-600 hover:text-blue-700 transition-colors duration-150
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
          {menu.cta.label}
          <HiArrowUpRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MOBILE ACCORDION ITEM
═══════════════════════════════════════════════ */
function SidebarAccordion({ item, closeAll }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = item.icon;

  return (
    <div>
      <button
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 rounded-xl px-3 py-3
          text-sm font-semibold text-gray-700 hover:bg-gray-50
          transition-colors duration-150 focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <span className="flex h-9 w-9 items-center justify-center
          rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <span className="flex-1 text-left">{item.label}</span>
        <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-200
          ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="mt-1 ml-12 space-y-0.5">
          {item.children.map(({ icon: CIcon, label, href, desc }) => (
            <Link key={href} href={href}
              onClick={() => { setExpanded(false); closeAll(); }}
              className="group flex items-center gap-2.5 px-3 py-2.5 rounded-xl
                hover:bg-blue-50 transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <span className="w-6 h-6 rounded-lg bg-gray-100 group-hover:bg-blue-100
                flex items-center justify-center flex-shrink-0
                transition-colors duration-150">
                <CIcon className="text-gray-500 group-hover:text-blue-600 text-[9px]
                  transition-colors duration-150" />
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700
                  group-hover:text-blue-700 leading-none transition-colors duration-150">
                  {label}
                </p>
                {desc && (
                  <p className="text-[10px] text-gray-400 mt-0.5">{desc}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN HEADER
═══════════════════════════════════════════════ */
export default function Header() {
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [isScrolled,     setIsScrolled]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMenu,     setActiveMenu]     = useState(null); // 'Services' | 'Blog' | null

  const sidebarRef  = useRef(null);
  const toggleRef   = useRef(null);
  const menuTimeout = useRef(null);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => {
      const sc  = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setIsScrolled(sc > 40);
      setScrollProgress(max > 0 ? Math.min(1, sc / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Sidebar: Escape + outside click */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { setSidebarOpen(false); setActiveMenu(null); }
    };
    const onClickOutside = (e) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      ) setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [sidebarOpen]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  /* Megamenu hover handlers with delay */
  const openMenu  = useCallback((label) => {
    clearTimeout(menuTimeout.current);
    setActiveMenu(label);
  }, []);

  const closeMenu = useCallback(() => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const keepMenu  = useCallback(() => {
    clearTimeout(menuTimeout.current);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════
          HEADER
      ═══════════════════════════════════════ */}
      <header
        aria-label="Main navigation"
        className={`fixed inset-x-0 top-0 z-50 h-[68px] transition-all duration-300
          ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/80'
            : 'bg-white'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between gap-4">

            {/* ── Logo ── */}
            <Link href="/" aria-label="RN All Steel Fabrication — Home"
              className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative">
                <Image
                  src="/images/logo.jpg"
                  alt="RN All Steel Fabrication"
                  width={40} height={40}
                  className="rounded-xl object-cover ring-1 ring-gray-100
                    transition-transform duration-300 group-hover:scale-[1.04]"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm sm:text-base font-black text-gray-900
                  tracking-tight group-hover:text-blue-700
                  transition-colors duration-200">
                  RN ALL STEEL
                </p>
                <p className="text-[10px] text-blue-600 font-bold uppercase
                  tracking-[0.15em] leading-none">
                  Fabrication Work
                </p>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1"
              aria-label="Primary navigation">
              {NAV_ITEMS.map((item) => {
                const hasMega = !!item.cols;

                if (hasMega) {
                  return (
                    <div key={item.label} className="relative"
                      onMouseEnter={() => openMenu(item.label)}
                      onMouseLeave={closeMenu}>
                      <button
                        aria-haspopup="true"
                        aria-expanded={activeMenu === item.label}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2
                          text-sm font-semibold rounded-xl transition-all duration-150
                          focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-blue-500
                          ${activeMenu === item.label
                            ? 'text-blue-700 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                          }`}
                        onClick={() =>
                          setActiveMenu((m) => m === item.label ? null : item.label)
                        }
                      >
                        {item.label}
                        <FaChevronDown className={`text-[9px] transition-transform duration-200
                          ${activeMenu === item.label ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                      </button>

                      {activeMenu === item.label && (
                        <div onMouseEnter={keepMenu} onMouseLeave={closeMenu}>
                          <MegaMenu
                            menu={item}
                            onClose={() => setActiveMenu(null)}
                          />
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link key={item.href} href={item.href}
                    className="px-3.5 py-2 text-sm font-semibold text-gray-700
                      hover:text-blue-700 hover:bg-gray-50 rounded-xl
                      transition-all duration-150
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-blue-500">
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              <a href="https://wa.me/+919665181246"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2
                  text-sm font-semibold text-emerald-700 bg-white
                  border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50
                  rounded-xl transition-all duration-150">
                <FaWhatsapp className="text-emerald-500 text-base" />
                WhatsApp
              </a>
              <a href="tel:+919665181246"
                className="inline-flex items-center gap-1.5 px-4 py-2
                  text-sm font-bold text-white bg-blue-600 hover:bg-blue-700
                  active:bg-blue-800 rounded-xl transition-colors duration-150
                  shadow-sm shadow-blue-200">
                <FaPhone className="text-[11px]" />
                Call Now
              </a>
            </div>

            {/* ── Mobile Toggle ── */}
            <button
              ref={toggleRef}
              onClick={() => setSidebarOpen((s) => !s)}
              aria-expanded={sidebarOpen}
              aria-controls="mobile-sidebar"
              aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden flex h-10 w-10 items-center justify-center
                rounded-xl border border-gray-200 bg-white hover:bg-gray-50
                active:bg-gray-100 transition-colors duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className={`transition-all duration-200 ${sidebarOpen ? 'rotate-90' : 'rotate-0'}`}>
                {sidebarOpen
                  ? <FaTimes className="h-4 w-4 text-gray-700" />
                  : <FaBars className="h-4 w-4 text-gray-700" />}
              </span>
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-sky-400
              transition-all duration-150 ease-out"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            aria-hidden
          />
        </div> */}
      </header>

      {/* Spacer */}
      <div className="h-[68px]" aria-hidden />

      {/* ═══════════════════════════════════════
          MOBILE SIDEBAR
      ═══════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-gray-950/50 backdrop-blur-sm
          transition-opacity duration-300
          ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        id="mobile-sidebar"
        ref={sidebarRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[320px]
          bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 py-4
          border-b border-gray-100 flex-shrink-0">
          <Link href="/" onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3">
            <Image
              src="/images/logo.jpg"
              alt="RN All Steel Fabrication"
              width={36} height={36}
              className="rounded-xl object-cover"
            />
            <div>
              <p className="text-sm font-black text-gray-900 leading-none">
                RN ALL STEEL
              </p>
              <p className="text-[10px] text-blue-600 font-bold uppercase
                tracking-[0.12em] mt-0.5">
                Fabrication Work
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl
              bg-gray-100 hover:bg-gray-200 active:bg-gray-300
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <FaTimes className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Sidebar body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            if (item.children) {
              return (
                <SidebarAccordion
                  key={item.label}
                  item={item}
                  closeAll={() => setSidebarOpen(false)}
                />
              );
            }
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3
                  text-sm font-semibold text-gray-700 hover:bg-gray-50
                  hover:text-blue-700 transition-colors duration-150
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-blue-500">
                <span className="flex h-9 w-9 items-center justify-center
                  rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                {item.label}
              </Link>
            );
          })}

          {/* Why choose us */}
          <div className="mt-4 pt-5 border-t border-gray-100">
            <p className="text-[10px] font-black text-gray-400 uppercase
              tracking-[0.2em] px-3 mb-3">
              Why Choose Us
            </p>
            <ul className="space-y-2.5 px-3">
              {[
                'Precision engineering & robust materials',
                '15+ years serving Mumbai & Thane',
                'ISO-grade quality & timely delivery',
                '500+ successful projects completed',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600
                    flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar footer CTAs */}
        <div className="flex-shrink-0 border-t border-gray-100 px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a href="tel:+919665181246"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex items-center justify-center gap-2
                bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                text-white px-4 py-3 rounded-xl font-bold text-sm
                transition-colors duration-150 shadow-sm shadow-blue-200">
              <FaPhone className="text-xs" />
              Call Now
            </a>
            <a href="https://wa.me/+919665181246"
              target="_blank" rel="noopener noreferrer"
              onClick={() => setSidebarOpen(false)}
              className="inline-flex items-center justify-center gap-2
                border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50
                text-emerald-700 px-4 py-3 rounded-xl font-bold text-sm
                transition-colors duration-150">
              <FaWhatsapp className="text-base" />
              WhatsApp
            </a>
          </div>
          <p className="text-center text-[11px] text-gray-400 font-medium">
            Free consultation · Site visits in Mumbai & Thane
          </p>
        </div>
      </aside>
    </>
  );
}