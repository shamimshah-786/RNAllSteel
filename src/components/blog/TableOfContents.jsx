'use client';

import { useEffect, useState, useCallback } from 'react';

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState('');

  // Inject IDs into DOM headings that match MDX-rendered h2/h3
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;
    const domHeadings = article.querySelectorAll('h2, h3');
    domHeadings.forEach((el) => {
      const text = el.textContent?.trim() ?? '';
      const id   = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      if (!el.id) el.id = id;
    });
  }, []);

  // IntersectionObserver — highlight active heading
  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 96; // sticky header height
    const top    = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  if (!headings.length) return null;

  return (
    <nav aria-label="Table of contents">
      <ol className="space-y-0.5">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          return (
            <li key={id} className={level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`
                  block text-[12px] leading-snug py-1.5 px-2.5 rounded-lg
                  transition-all duration-200 font-medium
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 pl-2'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}
                `}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
