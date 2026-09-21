/* ═══════════════════════════════════════════════════════════════
   PROJECTS — the single source of truth for the gallery.
   ───────────────────────────────────────────────────────────────
   Used by the homepage strip, /projects, and every
   /projects/<category> page. Do not copy this list anywhere else.

   FIELDS
     slug      URL-safe id. Also the lightbox deep-link (?p=<slug>).
     category  Must match a PROJECT_CATEGORIES slug below — this is
               what groups the gallery.
     service   Slug from src/data/services.js. This is the link that
               turns a photo into an SEO asset: every project points
               at the service page it belongs to.
     alt       Real alt text. Describe what is in the photo, with the
               material and the place — it feeds image search and is
               read aloud by screen readers. Never leave it generic.
     featured  Shown in the homepage strip.

   ADDING A PROJECT
     Drop the image in /public/projects/<category>/, add an entry
     here, and it appears in the gallery, the category page, the
     sitemap and the schema automatically.
═══════════════════════════════════════════════════════════════ */

export const PROJECT_CATEGORIES = [
  {
    slug: 'main-gates',
    name: 'Main Gates',
    code: 'MG',
    heading: 'Main Gate Designs',
    service: 'main-gates',
    summary:
      'Designer entrance gates in mild steel, stainless steel and wrought iron — sliding, swing and laser-cut.',
    intro:
      'Main gates are the largest single piece of steel most homes ever buy, and the one everybody sees first. The gallery below covers the range we build: wrought-iron scroll work for traditional bungalows, laser-cut panels for modern elevations, and plain SS or powder-coated MS where the brief is security before decoration.',
    keywords: ['main gate design', 'steel gate design', 'gate design photos', 'MS gate design'],
  },
  {
    slug: 'railings',
    name: 'Railings',
    code: 'RL',
    heading: 'Railing Designs',
    service: 'ss-railings',
    summary:
      'Staircase, balcony, terrace and mezzanine railings in SS 304, mild steel and glass.',
    intro:
      'Railings are the bulk of our workshop output, and they cover a wide range — a mirror-polished SS staircase railing in a duplex, a designer-panel balcony railing on a high floor, a plain guardrail on an industrial mezzanine. What runs through all of them is the same detail: continuous handrail lines, buffed welds and base fixings that stay tight for years.',
    keywords: ['railing design', 'SS railing design', 'staircase railing photos', 'balcony railing design'],
  },
  {
    slug: 'window-grills',
    name: 'Window Grills',
    code: 'WG',
    heading: 'Window Grill Designs',
    service: 'window-grills',
    summary:
      'Modern, curved and designer window grills in stainless steel and mild steel.',
    intro:
      'Window grills have to secure the opening without turning the elevation into a cage. These are jobs where the pattern was chosen to suit the building — curved SS members on a plain facade, tight geometric grids where a society specified a common design, and heavier MS patterns on ground-floor flats.',
    keywords: ['window grill design', 'SS window grill', 'grill design photos', 'modern window grill'],
  },
  {
    slug: 'main-doors',
    name: 'Main Doors',
    code: 'MD',
    heading: 'Safety & Main Door Designs',
    service: 'safety-doors',
    summary:
      'Stainless steel safety doors and designer main doors, including wooden-finish laminates.',
    intro:
      'A safety door has to be strong at the frame and the lock, and still look like a front door rather than a shutter. These jobs show both sides of that: mirror and matte SS faces for open corridors, and wooden-finish laminates on a steel core for entrances that need to match the interior joinery.',
    keywords: ['safety door design', 'SS main door design', 'steel door photos', 'security door design'],
  },
  {
    slug: 'collapsible-gates',
    name: 'Collapsible Gates',
    code: 'CG',
    heading: 'Collapsible Gate Designs',
    service: 'main-gates',
    summary:
      'Space-saving collapsible security gates for doorways, shops and windows.',
    intro:
      'Collapsible gates fold flat against the reveal when open, which makes them the practical choice for shopfronts, flat entrances and windows where there is no room for a swinging leaf. The channel and roller quality is what decides whether one still slides smoothly after five years of daily use.',
    keywords: ['collapsible gate', 'collapsible gate design', 'folding security gate', 'shop gate'],
  },
  {
    slug: 'street-stalls',
    name: 'Street Stalls',
    code: 'ST',
    heading: 'Food Carts & Commercial Steelwork',
    service: 'commercial-projects',
    summary:
      'Stainless steel food carts, stalls and commercial counters in food-grade SS.',
    intro:
      'Commercial food work is judged on hygiene and daily durability. We build carts, stalls and prep counters in food-grade SS 304 with rounded, cleanable corners and no crevices where residue can collect — built to survive being scrubbed down every single night.',
    keywords: ['food cart fabrication', 'SS food stall', 'stainless steel cart', 'commercial kitchen steel'],
  },
];

export const PROJECTS = [
  /* ─── Main Gates ─── */
  {
    id: 12,
    slug: 'wrought-iron-designer-main-gate-gold',
    src: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp',
    title: 'Wrought Iron Designer Main Gate with Gold Finish',
    alt: 'Wrought iron designer main gate with gold-finished scroll work at a residential entrance in Mumbai',
    category: 'main-gates',
    service: 'main-gates',
    material: 'Wrought Iron',
    finish: 'Gold enamel',
    tag: 'Residential',
    featured: true,
  },
  {
    id: 13,
    slug: 'laser-cut-steel-main-gate',
    src: '/projects/main-gates/laser-cut-steel-main-gate.webp',
    title: 'Modern Laser Cut Steel Main Gate',
    alt: 'Modern laser cut steel main gate with a geometric CNC pattern on a braced frame',
    category: 'main-gates',
    service: 'laser-cut-gates',
    material: 'Mild Steel',
    finish: 'Powder coated',
    tag: 'Laser Cut',
    featured: true,
  },
  {
    id: 14,
    slug: 'ms-sliding-main-gate-laser-cut',
    src: '/projects/main-gates/ms-sliding-main-gate-laser-cut.webp',
    title: 'Mild Steel Sliding Main Gate with Laser Cut Panel',
    alt: 'Mild steel sliding main gate with a laser cut decorative panel running on a floor track',
    category: 'main-gates',
    service: 'sliding-gates',
    material: 'Mild Steel',
    finish: 'Powder coated',
    tag: 'Sliding',
  },
  {
    id: 19,
    slug: 'ss-swing-compound-main-gate',
    src: '/projects/main-gates/ss-swing-compound-main-gate.webp',
    title: 'SS Swing Main Gate with Decorative Design',
    alt: 'Stainless steel double-leaf swing compound gate with decorative infill at a house entrance',
    category: 'main-gates',
    service: 'swing-gates',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Swing',
  },
  {
    id: 4,
    slug: 'stainless-steel-main-gate-house',
    src: '/projects/main-gates/stainless-steel-main-gate-house.webp',
    title: 'Stainless Steel Main Gate',
    alt: 'Polished stainless steel main gate installed at a residential compound wall',
    category: 'main-gates',
    service: 'main-gates',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Residential',
  },
  {
    id: 1,
    slug: 'ms-decorative-main-gate-house',
    src: '/projects/main-gates/ms-decorative-main-gate-house.webp',
    title: 'Mild Steel Decorative Main Gate',
    alt: 'Mild steel decorative main gate with painted finish at a house entrance in Thane',
    category: 'main-gates',
    service: 'main-gates',
    material: 'Mild Steel',
    finish: 'Enamel paint',
    tag: 'Decorative',
  },
  {
    id: 11,
    slug: 'ss-staircase-safety-gate',
    src: '/projects/main-gates/ss-staircase-safety-gate.webp',
    title: 'Stainless Steel Staircase Safety Gate',
    alt: 'Stainless steel safety gate fitted at the top of a staircase for child safety',
    category: 'main-gates',
    service: 'safety-grills',
    material: 'SS 304',
    finish: 'Matte hairline',
    tag: 'Child Safety',
  },

  /* ─── Railings ─── */
  {
    id: 16,
    slug: 'ss-balcony-railing-designer',
    src: '/projects/railings/ss-balcony-railing-designer.webp',
    title: 'SS Balcony Railing with Designer Panels',
    alt: 'Stainless steel balcony railing with designer infill panels on an apartment balcony in Thane',
    category: 'railings',
    service: 'balcony-railings',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Balcony',
    featured: true,
  },
  {
    id: 5,
    slug: 'stainless-steel-staircase-railing',
    src: '/projects/railings/stainless-steel-staircase-railing.webp',
    title: 'Stainless Steel Staircase Railing',
    alt: 'Mirror-polished stainless steel staircase railing with vertical balusters in a duplex home',
    category: 'railings',
    service: 'staircase-railings',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Staircase',
    featured: true,
  },
  {
    id: 22,
    slug: 'ss-bungalow-balcony-railing-window-grill',
    src: '/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg',
    title: 'SS Railings & Window Grills for Modern Bungalow',
    alt: 'Stainless steel balcony railings and matching window grills on a modern bungalow elevation',
    category: 'railings',
    service: 'residential-projects',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Full Package',
    featured: true,
  },
  {
    id: 21,
    slug: 'ss-mezzanine-railing-metal-stairs',
    src: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp',
    title: 'SS Mezzanine Railing with Metal Staircase',
    alt: 'Stainless steel mezzanine guardrail alongside a fabricated metal staircase in a commercial unit',
    category: 'railings',
    service: 'industrial-projects',
    material: 'SS 304',
    finish: 'Matte hairline',
    tag: 'Industrial',
    featured: true,
  },
  {
    id: 20,
    slug: 'ss-balcony-railing-curved-design',
    src: '/projects/railings/ss-balcony-railing-curved-design.webp',
    title: 'Stainless Steel Balcony Railing with Curved Design',
    alt: 'Stainless steel balcony railing with curved vertical members on a terrace edge',
    category: 'railings',
    service: 'terrace-railings',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Curved',
  },
  {
    id: 10,
    slug: 'ss-staircase-railing-decorative-pillars',
    src: '/projects/railings/ss-staircase-railing-decorative-pillars.webp',
    title: 'SS Staircase Railing with Decorative Pillars',
    alt: 'Stainless steel staircase railing with decorative turned pillars and a continuous handrail',
    category: 'railings',
    service: 'staircase-railings',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Decorative',
  },
  {
    id: 7,
    slug: 'steel-staircase-railing',
    src: '/projects/railings/steel-staircase-railing.webp',
    title: 'Steel Staircase Railing',
    alt: 'Fabricated steel staircase railing with horizontal members in a residential stairwell',
    category: 'railings',
    service: 'ms-railings',
    material: 'Mild Steel',
    finish: 'Powder coated',
    tag: 'Staircase',
  },

  /* ─── Window Grills ─── */
  {
    id: 3,
    slug: 'stainless-steel-window-grill-modern',
    src: '/projects/window-grills/stainless-steel-window-grill-modern.webp',
    title: 'Modern Stainless Steel Window Grill',
    alt: 'Modern stainless steel window grill with curved vertical members on an apartment window',
    category: 'window-grills',
    service: 'window-grills',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Modern',
    featured: true,
  },
  {
    id: 6,
    slug: 'designer-ss-window-grill',
    src: '/projects/window-grills/designer-ss-window-grill.webp',
    title: 'Designer Stainless Steel Window Grill',
    alt: 'Designer stainless steel window grill with a patterned infill on a residential window',
    category: 'window-grills',
    service: 'window-grills',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Designer',
  },
  {
    id: 18,
    slug: 'ss-window-grill-apartment',
    src: '/projects/window-grills/ss-window-grill-apartment.webp',
    title: 'Stainless Steel Window Grill for Apartment',
    alt: 'Stainless steel window grill with child-safe spacing fitted to an apartment window reveal',
    category: 'window-grills',
    service: 'safety-grills',
    material: 'SS 304',
    finish: 'Matte hairline',
    tag: 'Child Safety',
  },

  /* ─── Main Doors ─── */
  {
    id: 17,
    slug: 'ss-main-door-wooden-finish',
    src: '/projects/main-doors/ss-main-door-wooden-finish.webp',
    title: 'SS Main Door with Wooden Finish',
    alt: 'Stainless steel safety door with a wooden-finish laminate face at a flat entrance',
    category: 'main-doors',
    service: 'safety-doors',
    material: 'SS 304',
    finish: 'Wooden laminate',
    tag: 'Premium',
    featured: true,
  },
  {
    id: 9,
    slug: 'ss-designer-main-door',
    src: '/projects/main-doors/ss-designer-main-door.webp',
    title: 'Stainless Steel Designer Main Door',
    alt: 'Stainless steel designer safety door with a decorative grill panel at a residential entrance',
    category: 'main-doors',
    service: 'safety-doors',
    material: 'SS 304',
    finish: 'Mirror polish',
    tag: 'Designer',
  },

  /* ─── Collapsible Gates ─── */
  {
    id: 8,
    slug: 'collapsible-steel-gate',
    src: '/projects/collapsible-gates/collapsible-steel-gate.webp',
    title: 'Collapsible Steel Gate',
    alt: 'Collapsible steel security gate folded against the reveal at a doorway entrance',
    category: 'collapsible-gates',
    service: 'main-gates',
    material: 'Mild Steel',
    finish: 'Powder coated',
    tag: 'Security',
    featured: true,
  },
  {
    id: 15,
    slug: 'collapsible-steel-window-gate',
    src: '/projects/collapsible-gates/collapsible-steel-window-gate.webp',
    title: 'Collapsible Steel Window Gate',
    alt: 'Collapsible steel gate fitted across a window opening for ground floor security',
    category: 'collapsible-gates',
    service: 'window-grills',
    material: 'Mild Steel',
    finish: 'Powder coated',
    tag: 'Window',
  },

  /* ─── Street Stalls ─── */
  {
    id: 2,
    slug: 'stainless-steel-food-cart-stall',
    src: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
    title: 'Stainless Steel Food Cart & Stall',
    alt: 'Stainless steel food cart with a serving counter and overhead canopy built in food-grade SS',
    category: 'street-stalls',
    service: 'commercial-projects',
    material: 'SS 304',
    finish: 'Matte hairline',
    tag: 'Commercial',
  },
];

/* ─────────────────────── LOOKUPS ─────────────────────── */

export const CATEGORY_MAP = Object.fromEntries(
  PROJECT_CATEGORIES.map((c) => [c.slug, c])
);

export const getCategory = (slug) => CATEGORY_MAP[slug] ?? null;

export const projectsIn = (categorySlug) =>
  PROJECTS.filter((p) => p.category === categorySlug);

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

/** Categories with their projects attached, empty groups dropped. */
export const projectGroups = () =>
  PROJECT_CATEGORIES.map((category) => ({
    ...category,
    projects: projectsIn(category.slug),
  })).filter((g) => g.projects.length > 0);

export const categoryName = (slug) => CATEGORY_MAP[slug]?.name ?? slug;
