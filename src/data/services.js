/* ═══════════════════════════════════════════════════════════════
   SERVICES — the source of truth for every service page.
   ───────────────────────────────────────────────────────────────
   Each entry generates:
     • /services/<slug>                  — the service page
     • /services/<slug>/<city>           — one page per city (see
       src/data/locations.js for which cities get which services)

   FIELDS
     slug        URL segment. Changing it changes the live URL —
                 only change it if you also add a redirect.
     name        Full name, used in <h1> and titles.
     short       Compact name for cards, breadcrumbs and menus.
     category    Groups the service on the /services hub.
     priority    1 = shown on the homepage "top services" grid.
                 1–2 = also gets city pages in extended-tier cities.
     image       Hero image. ⚠️ Services marked NEEDS PHOTO below
                 are borrowing a related image — replace them with
                 real job photos when you have them, it matters both
                 for conversions and for image search.
     body        Paragraphs of unique copy. Keep every service's
                 copy genuinely different — duplicated text across
                 pages is the fastest way to lose these rankings.
     faqs        Rendered as visible FAQs *and* as FAQPage schema.
     related     Slugs shown as "related services" (internal links).
═══════════════════════════════════════════════════════════════ */

export const SERVICE_CATEGORIES = [
  'Railings',
  'Gates',
  'Doors & Grills',
  'Windows & Glass',
  'Sheds & Structures',
  'Custom & Projects',
];

export const SERVICES = [
  /* ─────────────────────── RAILINGS ─────────────────────── */
  {
    slug: 'ss-railings',
    name: 'Stainless Steel (SS) Railings',
    short: 'SS Railings',
    category: 'Railings',
    priority: 1,
    image: '/projects/railings/stainless-steel-staircase-railing.webp',
    tagline: 'SS 304 railings with mirror or matte finish',
    summary:
      'Corrosion-resistant SS 304 railings for staircases, balconies and terraces — fabricated to your exact site measurements.',
    body: [
      'Stainless steel railings are the most popular choice in Mumbai and Thane for one simple reason: they survive coastal humidity and monsoon rain without rusting, and they still look new after a decade. We fabricate in SS 304 as standard, with SS 202 available where budget is the deciding factor and the railing is fully indoors.',
      'Every railing is measured on site before a single pipe is cut. Our team welds, grinds and buffs each joint so the handrail runs as one continuous line — no visible seams, no rough weld beads at the ankle level where children run their hands. Vertical members, glass infills, cable infills or designer panels are all available on the same frame.',
    ],
    features: [
      'SS 304 grade pipe as standard, SS 202 on request',
      'Mirror-polished or matte hairline finish',
      'Seamless buffed welds — no visible joints',
      'Glass, cable, mesh or designer panel infills',
      'Wall-mount, floor-mount or side-mount base plates',
      'Custom heights to match building safety norms',
    ],
    specs: [
      { k: 'Material', v: 'SS 304 / SS 202' },
      { k: 'Pipe Sizes', v: '25mm – 50mm dia' },
      { k: 'Finish', v: 'Mirror / Matte hairline' },
      { k: 'Typical Height', v: "3'0\" – 3'6\"" },
      { k: 'Lead Time', v: '15–20 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Staircases', 'Balconies', 'Terraces', 'Duplex mezzanines'],
    faqs: [
      {
        q: 'Is SS 304 really necessary, or will SS 202 do?',
        a: 'For anything exposed to open air — balconies, terraces, compound stairs — use SS 304. It holds up to salt-laden coastal air. SS 202 costs less and is fine for fully covered indoor staircases, but it can develop surface spotting near the sea.',
      },
      {
        q: 'How long does an SS railing take to install?',
        a: 'A typical home staircase or balcony railing takes 15–20 days from approved measurement to installation. Installation itself is usually one day and we clean the site before leaving.',
      },
      {
        q: 'Will the mirror finish scratch?',
        a: 'Mirror polish shows fingerprints and fine scratches more than matte. For staircases used by children or in commercial buildings, we usually recommend a matte hairline finish — it hides daily wear far better.',
      },
      {
        q: 'Can you match an existing railing in my building?',
        a: 'Yes. Send us a photo on WhatsApp and we will match the pipe diameter, pattern and finish so the new section reads as part of the original run.',
      },
    ],
    related: ['staircase-railings', 'balcony-railings', 'glass-railings', 'ms-railings'],
    keywords: [
      'SS railing',
      'stainless steel railing',
      'SS 304 railing',
      'steel railing fabrication',
    ],
  },
  {
    slug: 'aluminium-glass-railings',
    name: 'Aluminium Glass Railings',
    short: 'Aluminium Glass Railings',
    category: 'Railings',
    priority: 2,
    image: '/images/glass.jpg',
    tagline: 'Powder-coated aluminium profiles with toughened glass',
    summary:
      'Lightweight aluminium-framed glass railings — rust-proof, low maintenance and ideal for modern balconies.',
    body: [
      'Aluminium glass railings give you the open, uninterrupted view of glass with a frame that will never rust. The profiles are powder-coated, so the colour is baked on rather than painted over, and they stay maintenance-free through years of monsoon exposure.',
      'We use toughened glass throughout, held in an aluminium base channel or point-fixed to aluminium posts. Because aluminium is far lighter than steel, this system is the practical choice for high-floor balconies and terraces where lifting heavy sections is difficult.',
    ],
    features: [
      'Powder-coated aluminium profiles in multiple shades',
      '10mm / 12mm toughened glass',
      'Base-channel or post-fixed systems',
      'Zero rust — ideal for sea-facing flats',
      'Lightweight, easy to hoist to upper floors',
      'Clear, frosted or tinted glass options',
    ],
    specs: [
      { k: 'Frame', v: 'Powder-coated aluminium' },
      { k: 'Glass', v: '10mm / 12mm toughened' },
      { k: 'Fixing', v: 'Base channel / point fixed' },
      { k: 'Finish', v: 'Matte, wood-grain, custom RAL' },
      { k: 'Lead Time', v: '18–25 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['High-rise balconies', 'Sea-facing flats', 'Terrace gardens', 'Office atriums'],
    faqs: [
      {
        q: 'Aluminium or stainless steel — which is better for a balcony?',
        a: 'Aluminium wins on weight and on rust resistance, and the powder-coated colour options suit modern facades. Stainless steel wins on strength and on that classic polished look. For a high-floor sea-facing balcony we usually suggest aluminium.',
      },
      {
        q: 'Is toughened glass safe if it breaks?',
        a: 'Yes. Toughened glass shatters into small blunt granules rather than sharp shards. For balconies above the second floor we can also supply laminated toughened glass, which holds together in the frame even after impact.',
      },
      {
        q: 'Does the powder coating fade?',
        a: 'Quality powder coating holds its colour for years. Darker shades in permanent direct sun will lighten slowly over a long period — we can advise on shade selection for fully exposed terraces.',
      },
      {
        q: 'How do I clean it?',
        a: 'Plain water and a soft cloth. Avoid abrasive scrubs or acidic cleaners on the coated profiles.',
      },
    ],
    related: ['glass-railings', 'frameless-glass-railings', 'balcony-railings', 'aluminium-sliding-windows'],
    keywords: ['aluminium glass railing', 'aluminium railing', 'glass balcony railing'],
  },
  {
    slug: 'ms-railings',
    name: 'Mild Steel (MS) Railings',
    short: 'MS Railings',
    category: 'Railings',
    priority: 2,
    image: '/projects/railings/steel-staircase-railing.webp',
    tagline: 'Strong, economical MS railings with protective coating',
    summary:
      'Budget-friendly mild steel railings with primer and enamel or powder-coat finish — strong, repairable and fully customisable.',
    body: [
      'Mild steel is the workhorse of railing fabrication. It costs considerably less than stainless steel, takes any shape you can draw, and can be welded and repaired on site years later. For decorative scroll work, grill-pattern railings and heavy-duty industrial runs, MS remains the right material.',
      'The whole life of an MS railing depends on its coating. We degrease and clean the fabricated frame, apply a red-oxide or zinc-rich primer, then finish in enamel or powder coating. Done properly and re-coated every few years, an MS railing lasts decades even in Mumbai weather.',
    ],
    features: [
      'Any pattern — scroll, grid, laser-cut or plain bar',
      'Red-oxide or zinc-rich primer base',
      'Enamel paint or powder-coated top coat',
      'Considerably lower cost than stainless steel',
      'Site-repairable and re-paintable',
      'Heavy sections available for industrial use',
    ],
    specs: [
      { k: 'Material', v: 'MS square / round / flat sections' },
      { k: 'Primer', v: 'Red oxide / Zinc rich' },
      { k: 'Top Coat', v: 'Enamel or powder coating' },
      { k: 'Typical Height', v: "3'0\" – 4'0\"" },
      { k: 'Lead Time', v: '12–18 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Compound stairs', 'Industrial platforms', 'Budget projects', 'Decorative scroll railings'],
    faqs: [
      {
        q: 'How often does an MS railing need repainting?',
        a: 'Outdoors in Mumbai, plan on a fresh coat every 3–4 years. Indoors it can go much longer. Catching rust spots early and touching them up costs far less than a full re-coat.',
      },
      {
        q: 'Is powder coating worth the extra cost over enamel?',
        a: 'For exposed railings, yes. Powder coating is baked on, so it resists chipping and weathering much better than brush-applied enamel. Enamel makes sense for sheltered indoor runs and tight budgets.',
      },
      {
        q: 'Can MS and SS be combined in one railing?',
        a: 'Yes, and it is a common way to control cost — an MS frame and infill with an SS handrail on top gives you the polished touch-point at a lower overall price.',
      },
      {
        q: 'Will it rust in a coastal building?',
        a: 'Any mild steel will rust if the coating breaks. Close to the sea we recommend zinc-rich primer plus powder coating, or switching to SS 304 for the exposed sections.',
      },
    ],
    related: ['ss-railings', 'staircase-railings', 'safety-grills', 'custom-steel-fabrication'],
    keywords: ['MS railing', 'mild steel railing', 'iron railing', 'steel railing price'],
  },
  {
    slug: 'staircase-railings',
    name: 'Staircase Railings',
    short: 'Staircase Railings',
    category: 'Railings',
    priority: 1,
    image: '/images/banner3.jpg',
    tagline: 'Handrails engineered for safe, comfortable daily use',
    summary:
      'Staircase railings in SS, MS or glass — set at the right height and grip, and installed to hold firm for years.',
    body: [
      'A staircase railing is the one piece of steel in a home that gets touched every single day, so it has to be right in three ways: the handrail height must suit the users, the grip diameter must sit comfortably in the hand, and the base fixing must not loosen over years of leaning weight.',
      'We measure the actual rise and going of your staircase rather than working from a drawing, then set the handrail parallel to the nosing line so it reads straight from every angle. Landings, curves and winders are fabricated as continuous bends wherever the design allows, instead of joining short straight sections at visible angles.',
    ],
    features: [
      'Handrail height set to your stair geometry',
      'Comfortable 38mm–50mm grip diameter',
      'Continuous bends at landings and curves',
      'Chemical-anchor base fixing into concrete',
      'Child-safe vertical baluster spacing',
      'SS, MS, glass or combination systems',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / MS / Glass' },
      { k: 'Handrail Dia', v: '38mm – 50mm' },
      { k: 'Baluster Gap', v: 'Under 100mm (child safe)' },
      { k: 'Fixing', v: 'Chemical anchor bolts' },
      { k: 'Lead Time', v: '15–20 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Duplex homes', 'Bungalow staircases', 'Building common stairs', 'Shop mezzanines'],
    faqs: [
      {
        q: 'What is the right height for a staircase railing?',
        a: "We normally set the handrail around 3'0\" measured vertically from the stair nosing, and 3'6\" on landings. If the household includes elderly members or young children we adjust the height and can add a second lower rail.",
      },
      {
        q: 'How much gap should there be between balusters?',
        a: 'Keep it under 100mm so a small child cannot pass their head through. We use this as the default on every home staircase unless you ask otherwise.',
      },
      {
        q: 'Can you fit a railing on a curved or spiral staircase?',
        a: 'Yes. Curved staircases need the handrail bent to the actual radius, which we template on site. It costs more than a straight run but produces a far better result than segmenting it.',
      },
      {
        q: 'Will drilling into my stairs damage them?',
        a: 'We use chemical anchors sized to the slab, which need a smaller hole than expansion bolts and hold better in concrete. On finished marble or granite we drill carefully with the right bit to avoid chipping.',
      },
    ],
    related: ['ss-railings', 'ms-railings', 'balcony-railings', 'glass-railings'],
    keywords: ['staircase railing', 'stair railing design', 'steel staircase railing', 'handrail'],
  },
  {
    slug: 'balcony-railings',
    name: 'Balcony Railings',
    short: 'Balcony Railings',
    category: 'Railings',
    priority: 1,
    image: '/projects/railings/ss-balcony-railing-designer.webp',
    tagline: 'Safe, weather-proof railings that keep the view open',
    summary:
      'Balcony railings in SS, glass or aluminium — built to full safety height without blocking light or your view.',
    body: [
      'A balcony railing has to do two things at once: stop anyone from falling, and stay out of the way of the view you paid for. We work that balance with the infill — clear toughened glass for an open outlook, slim vertical SS members where you want airflow, or designer panels where privacy matters more.',
      'Fixing is where balcony railings usually fail. Parapet-top fixing, side fixing on the slab edge and face fixing all behave differently under load, and the right one depends on your parapet width and its condition. We check that on site before quoting, so the railing holds firm in the wind instead of working loose over a few monsoons.',
    ],
    features: [
      'Full safety height above finished floor level',
      'Glass, vertical, cable or designer panel infill',
      'Top, side or face fixing as the slab allows',
      'Marine-grade fasteners for sea-facing flats',
      'Drainage-friendly base detail — no water pooling',
      'Matched across multiple balconies of one building',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / Aluminium / Glass' },
      { k: 'Height', v: "3'6\" – 4'0\" typical" },
      { k: 'Glass', v: '10mm / 12mm toughened' },
      { k: 'Fixing', v: 'Top / side / face mount' },
      { k: 'Lead Time', v: '15–20 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Apartment balconies', 'Sea-facing flats', 'Bungalow verandas', 'Juliet balconies'],
    faqs: [
      {
        q: 'What height should a balcony railing be?',
        a: "For flats above the ground floor we build to a minimum of 3'6\" from the finished floor, and go to 4'0\" for high floors or where there is a foot-hold on the parapet. Many housing societies specify a height — send us the circular and we will build to it.",
      },
      {
        q: 'Do I need society permission before changing my balcony railing?',
        a: 'Usually yes, because it affects the building elevation. Most societies approve it quickly if the design matches the other flats. We can supply a drawing and photos to submit with your application.',
      },
      {
        q: 'Is glass safe on a high-floor balcony?',
        a: 'Toughened glass in a properly fixed frame is safe and widely used. For very high floors or homes with young children we recommend laminated toughened glass, which stays in place in the frame even if it cracks.',
      },
      {
        q: 'Will sea air damage the fittings?',
        a: 'Ordinary fasteners will corrode within a couple of years near the sea. On sea-facing work we use SS 304 fasteners throughout, which is a small extra cost and prevents ugly rust streaks down your facade.',
      },
    ],
    related: ['ss-railings', 'glass-railings', 'aluminium-glass-railings', 'terrace-railings'],
    keywords: ['balcony railing', 'balcony grill', 'balcony railing design', 'glass balcony railing'],
  },
  {
    slug: 'terrace-railings',
    name: 'Terrace Railings',
    short: 'Terrace Railings',
    category: 'Railings',
    priority: 2,
    image: '/projects/railings/ss-balcony-railing-curved-design.webp',
    tagline: 'Full-exposure railings built for wind, sun and monsoon',
    summary:
      'Terrace and parapet railings engineered for constant weather exposure — properly anchored and fully rust-protected.',
    body: [
      'Terrace railings take more punishment than anything else we fabricate. They are in the sun all day, take the full force of monsoon wind, and sit on a parapet that is often already waterproofed. Everything about the build has to account for that.',
      'We anchor into sound structure rather than into loose parapet coping, seal every penetration so water cannot track into your waterproofing layer, and specify SS 304 or heavily coated MS depending on exposure. Where terraces are used for gatherings, we increase the height and tighten the infill spacing.',
    ],
    features: [
      'Anchored into structural slab, not loose coping',
      'Sealed penetrations — waterproofing stays intact',
      'Wind-rated post spacing',
      'SS 304 or zinc-primed powder-coated MS',
      'Optional privacy or planter-integrated panels',
      'Heights raised for entertaining terraces',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / Coated MS' },
      { k: 'Height', v: "3'6\" – 4'6\"" },
      { k: 'Post Spacing', v: 'Wind-load dependent' },
      { k: 'Fixing', v: 'Chemical anchor + sealant' },
      { k: 'Lead Time', v: '18–22 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Terrace gardens', 'Rooftop seating', 'Society terraces', 'Bungalow roofs'],
    faqs: [
      {
        q: 'Will drilling into my terrace cause leakage?',
        a: 'It can if it is done carelessly. We drill into the structural slab or a raised pedestal rather than through the waterproofing membrane on the surface, and seal every bolt penetration. Where the terrace has fresh waterproofing we coordinate with your contractor first.',
      },
      {
        q: 'Can the railing be fixed on top of the existing parapet wall?',
        a: 'Yes, if the parapet is structurally sound and wide enough. If it is a thin block wall with only plaster holding it, we fix to the side face of the slab instead — a top fix there would loosen within a couple of years.',
      },
      {
        q: 'What height is needed for a terrace used for parties?',
        a: "We go to 4'0\"–4'6\" where people will gather near the edge, and avoid horizontal members that children can climb like a ladder.",
      },
      {
        q: 'How do I stop rust streaks on the terrace floor?',
        a: 'Use SS 304 for the base plates and fasteners even if the rest is MS. Almost every rust streak we are called to fix starts at a cheap base plate or bolt.',
      },
    ],
    related: ['balcony-railings', 'ss-railings', 'canopy', 'safety-grills'],
    keywords: ['terrace railing', 'rooftop railing', 'parapet railing', 'terrace safety grill'],
  },
  {
    slug: 'glass-railings',
    name: 'Glass Railings',
    short: 'Glass Railings',
    category: 'Railings',
    priority: 1,
    image: '/images/glass.jpg',
    tagline: 'Toughened glass in slim steel or aluminium frames',
    summary:
      'Framed toughened glass railings that keep sightlines open — for staircases, balconies and mezzanine edges.',
    body: [
      'Glass railings make a small space feel larger. Instead of a row of vertical bars breaking up the view, you get a clear panel with a slim handrail above it — which is why they have become the default in modern duplexes and renovated flats across Mumbai and Thane.',
      'We build framed glass systems using SS or aluminium posts with the glass held in a channel or on point-fixed spigots. Every panel is toughened before it reaches site, because toughened glass cannot be cut or drilled afterwards — which also means precise site measurement is essential, and we never skip it.',
    ],
    features: [
      '10mm / 12mm toughened glass panels',
      'SS 304 or aluminium framing',
      'Channel-fixed or spigot point-fixed',
      'Clear, frosted, tinted or laminated glass',
      'Slim handrail keeps the view open',
      'Edge-polished panels for a clean finish',
    ],
    specs: [
      { k: 'Glass', v: '10mm / 12mm toughened' },
      { k: 'Frame', v: 'SS 304 / Aluminium' },
      { k: 'Fixing', v: 'Base channel / spigot' },
      { k: 'Glass Options', v: 'Clear / frosted / tinted / laminated' },
      { k: 'Lead Time', v: '18–25 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Duplex staircases', 'Balconies', 'Mezzanine edges', 'Showroom interiors'],
    faqs: [
      {
        q: 'How thick should the glass be?',
        a: '10mm toughened is standard for indoor staircases and short balcony runs. We move to 12mm for longer unsupported spans, higher floors and anywhere exposed to strong wind.',
      },
      {
        q: 'Do glass railings need constant cleaning?',
        a: 'They show marks more than steel, but a weekly wipe with a glass cleaner keeps them clear. Frosted glass hides fingerprints noticeably better if that is a concern.',
      },
      {
        q: 'What happens if one panel breaks?',
        a: 'Only that panel is replaced. We keep the panel sizes and the frame details on record so a replacement can be toughened to match without re-measuring the whole run.',
      },
      {
        q: 'Framed or frameless — which should I choose?',
        a: 'Framed glass costs less and is more forgiving on uneven site conditions. Frameless looks cleaner and is the premium option. If budget is tight, framed glass with a slim SS handrail gets you most of the look.',
      },
    ],
    related: ['frameless-glass-railings', 'aluminium-glass-railings', 'balcony-railings', 'glass-partitions'],
    keywords: ['glass railing', 'toughened glass railing', 'glass railing design', 'glass balustrade'],
  },
  {
    slug: 'frameless-glass-railings',
    name: 'Frameless Glass Railings',
    short: 'Frameless Glass Railings',
    category: 'Railings',
    priority: 2,
    image: '/images/glass.jpg',
    tagline: 'Structural glass with no visible posts',
    summary:
      'Premium frameless glass balustrades fixed on base channel or spigots — the cleanest possible sightline.',
    body: [
      'Frameless glass is the premium end of railing work. There are no vertical posts at all — the glass itself is the structure, held at the bottom in an aluminium base channel or on stainless spigots, with an optional slim top cap.',
      'Because nothing braces the panel above the base, both the glass specification and the fixing have to be right. We use thicker toughened or laminated toughened glass, set each panel with structural wedges, and level the run carefully so the top edge stays true across the whole span. It is exacting work, and it looks like nothing else when it is done properly.',
    ],
    features: [
      '12mm+ toughened or laminated toughened glass',
      'Aluminium base channel or SS spigot fixing',
      'No vertical posts — completely open view',
      'Optional slim SS top cap handrail',
      'Structural wedge setting and precise levelling',
      'Polished edges on all exposed sides',
    ],
    specs: [
      { k: 'Glass', v: '12mm / 13.52mm laminated toughened' },
      { k: 'Fixing', v: 'Base channel / SS spigots' },
      { k: 'Top Cap', v: 'Optional slim SS handrail' },
      { k: 'Base Finish', v: 'Anodised or SS cover plate' },
      { k: 'Lead Time', v: '22–30 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Luxury duplexes', 'Sea-view balconies', 'Showrooms', 'Hotel lobbies'],
    faqs: [
      {
        q: 'Is frameless glass strong enough without posts?',
        a: 'Yes, when it is specified correctly. The strength comes from thicker structural glass and a properly engineered base channel or spigot. This is not a place to reduce glass thickness to save money, and we will not quote it that way.',
      },
      {
        q: 'How much more does frameless cost than framed glass?',
        a: 'Meaningfully more — thicker glass, heavier base hardware and more precise installation. We quote both options side by side after the site visit so you can see the difference before deciding.',
      },
      {
        q: 'Can it be installed on an existing balcony?',
        a: 'Often yes, but the base channel needs solid structure to bolt into and enough depth at the edge. We check that on site — sometimes a small structural kerb is needed first.',
      },
      {
        q: 'Do I need a top handrail?',
        a: 'Not structurally, if the glass is correctly specified. Many clients add a slim SS cap anyway because it protects the glass edge and gives you something to hold.',
      },
    ],
    related: ['glass-railings', 'aluminium-glass-railings', 'glass-partitions', 'balcony-railings'],
    keywords: ['frameless glass railing', 'frameless balustrade', 'structural glass railing'],
  },

  /* ─────────────────────── GATES ─────────────────────── */
  {
    slug: 'main-gates',
    name: 'Main Gates',
    short: 'Main Gates',
    category: 'Gates',
    priority: 1,
    image: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp',
    tagline: 'Designer entrance gates in MS, SS and wrought iron',
    summary:
      'Main gates that secure the entrance and set the tone for the property — sliding, swing, laser-cut or wrought iron.',
    body: [
      'The main gate is the first thing anyone sees and the last line of security for the property. We fabricate in mild steel for decorative and laser-cut designs, stainless steel where a low-maintenance polished look is wanted, and wrought iron for traditional scroll work.',
      'The frame is what separates a gate that swings true for twenty years from one that sags in two. We size the section to the leaf width, brace the corners properly, and set the hinge or roller line dead level before the gate is hung. Automation-ready builds are available if you plan to motorise the gate now or later.',
    ],
    features: [
      'MS, SS or wrought iron construction',
      'Sliding, swing or folding operation',
      'Laser-cut, scroll or panel designs',
      'Braced frames that will not sag',
      'Automation-ready with motor provision',
      'Wicket gate option for pedestrian entry',
    ],
    specs: [
      { k: 'Materials', v: 'MS / SS 304 / Wrought Iron' },
      { k: 'Types', v: 'Sliding, swing, folding' },
      { k: 'Finish', v: 'Powder coat / enamel / polish' },
      { k: 'Automation', v: 'Motor-ready on request' },
      { k: 'Lead Time', v: '20–30 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Bungalow entrances', 'Society main gates', 'Factory gates', 'Farmhouse entries'],
    faqs: [
      {
        q: 'Sliding or swing — which gate suits my entrance?',
        a: 'Sliding gates suit narrow plots where a swinging leaf would block the driveway or footpath, and they need clear side space to park the gate. Swing gates are simpler and cheaper but need clear arc space. We decide this on the site visit based on your frontage.',
      },
      {
        q: 'Can the gate be automated later?',
        a: 'Yes, if it is built for it from the start — correct frame rigidity, level track and a motor mounting provision. Tell us at quoting stage and we will build it automation-ready even if you install the motor years later.',
      },
      {
        q: 'How long does a main gate take?',
        a: 'Typically 20–30 days depending on design complexity and finish. Laser-cut panel gates take longer because the cutting is outsourced and then assembled and finished in our workshop.',
      },
      {
        q: 'What finish lasts longest outdoors?',
        a: 'Powder coating over a zinc-rich primer. Enamel paint is cheaper but needs re-coating sooner, especially on the bottom rail where water sits.',
      },
    ],
    related: ['sliding-gates', 'swing-gates', 'laser-cut-gates', 'safety-doors'],
    keywords: ['main gate', 'main gate design', 'steel main gate', 'gate fabrication'],
  },
  {
    slug: 'sliding-gates',
    name: 'Sliding Gates',
    short: 'Sliding Gates',
    category: 'Gates',
    priority: 2,
    image: '/projects/main-gates/ms-sliding-main-gate-laser-cut.webp',
    tagline: 'Track and cantilever sliding gates for tight frontages',
    summary:
      'Sliding gates that free up driveway space — smooth-rolling, automation-ready and built for daily use.',
    body: [
      'Sliding gates are the answer when a swinging leaf would eat into your driveway or spill onto the road. The gate parks alongside the compound wall instead of arcing outward, which on a tight Mumbai or Thane plot can be the difference between fitting a car in or not.',
      'We build both track-guided and cantilever types. Track gates run on a floor rail and cost less; cantilever gates hang from a counterweight section with no floor track at all, which suits driveways that flood or collect grit. Either way the rollers, guide posts and end stops are the parts that decide whether it still slides easily in year five.',
    ],
    features: [
      'Track-guided or cantilever (trackless) types',
      'Heavy-duty sealed bearing rollers',
      'Guide posts and end stops included',
      'Automation-ready with motor rack provision',
      'Laser-cut or plain infill panels',
      'Anti-derail top guides',
    ],
    specs: [
      { k: 'Types', v: 'Track guided / cantilever' },
      { k: 'Material', v: 'MS with powder coat, SS on request' },
      { k: 'Rollers', v: 'Sealed bearing' },
      { k: 'Automation', v: 'Rack-and-pinion ready' },
      { k: 'Lead Time', v: '22–30 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Narrow driveways', 'Society entrances', 'Warehouse yards', 'Row houses'],
    faqs: [
      {
        q: 'How much side space does a sliding gate need?',
        a: 'Roughly the full width of the gate leaf alongside the opening, plus a little clearance. If you do not have that, a folding or bi-parting sliding gate can halve the parking space needed.',
      },
      {
        q: 'Track or cantilever?',
        a: 'Cantilever costs more but has no floor track to jam with grit or flood water — worth it for driveways that pond in monsoon. Track gates are perfectly good on a well-drained, level entrance.',
      },
      {
        q: 'Does a sliding gate need maintenance?',
        a: 'Keep the track clear and grease the rollers once or twice a year. That is most of it. Automated gates should also have their safety sensors checked periodically.',
      },
      {
        q: 'Can you automate an existing sliding gate?',
        a: 'Often yes, provided the gate is rigid, runs smoothly by hand and the track is level. If it already binds when pushed manually, a motor will only strain and fail — that has to be fixed first.',
      },
    ],
    related: ['main-gates', 'swing-gates', 'laser-cut-gates', 'commercial-projects'],
    keywords: ['sliding gate', 'sliding main gate', 'automatic sliding gate', 'cantilever gate'],
  },
  {
    slug: 'swing-gates',
    name: 'Swing Gates',
    short: 'Swing Gates',
    category: 'Gates',
    priority: 2,
    image: '/projects/main-gates/ss-swing-compound-main-gate.webp',
    tagline: 'Single and double-leaf swing gates built to stay true',
    summary:
      'Classic hinged gates in single or double leaf — simple, reliable and the most economical gate to automate.',
    body: [
      'A swing gate is the simplest gate there is, and simplicity is exactly why it lasts. Fewer moving parts than a slider, nothing at floor level to jam, and straightforward automation with a pair of arm or underground motors.',
      'Everything depends on the hinge post and the frame. A wide leaf on an under-sized post will drop within a year and start scraping the ground. We size the posts to the leaf weight, set them in concrete, use adjustable heavy-duty hinges, and add a drop bolt on double-leaf gates so the meeting edge stays aligned.',
    ],
    features: [
      'Single or double-leaf configuration',
      'Adjustable heavy-duty hinges',
      'Properly sized and concreted hinge posts',
      'Drop bolt on double leaves',
      'Inward or outward opening',
      'Automation-ready with arm or underground motors',
    ],
    specs: [
      { k: 'Configuration', v: 'Single / double leaf' },
      { k: 'Material', v: 'MS / SS 304 / Wrought iron' },
      { k: 'Hinges', v: 'Adjustable heavy duty' },
      { k: 'Automation', v: 'Arm or underground motor' },
      { k: 'Lead Time', v: '18–26 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Bungalows', 'Row houses', 'Farm entrances', 'Side and service gates'],
    faqs: [
      {
        q: 'Should the gate open inward or outward?',
        a: 'Inward is safer and usually required where the gate opens onto a public road — an outward-swinging leaf can hit pedestrians or vehicles. Outward opening only makes sense on private setbacks with clear space.',
      },
      {
        q: 'Why do swing gates start scraping the ground?',
        a: 'Almost always an undersized hinge post or an unbraced leaf sagging at the outer corner. Both are avoidable at fabrication stage, and both are expensive to fix afterwards.',
      },
      {
        q: 'How wide can a single leaf be?',
        a: 'Beyond about 8 feet a single leaf gets heavy enough that we would recommend splitting it into a double leaf, or moving to a sliding gate. It keeps the hinge load sensible and the gate easy to move by hand.',
      },
      {
        q: 'Is automation practical on a swing gate?',
        a: 'Yes, and it is generally the cheapest gate type to automate. The gate must swing freely by hand first, and there has to be room for the motor arms at the hinge side.',
      },
    ],
    related: ['main-gates', 'sliding-gates', 'safety-doors', 'residential-projects'],
    keywords: ['swing gate', 'double leaf gate', 'compound gate', 'hinged gate'],
  },
  {
    slug: 'laser-cut-gates',
    name: 'Laser Cut Gates',
    short: 'Laser Cut Gates',
    category: 'Gates',
    priority: 1,
    image: '/projects/main-gates/laser-cut-steel-main-gate.webp',
    tagline: 'CNC-cut designer panels on a solid steel frame',
    summary:
      'Laser-cut gate panels in any pattern — geometric, floral or fully custom — mounted on a braced steel frame.',
    body: [
      'Laser cutting lets you put a pattern on a gate that no amount of hand fabrication could match — precise geometry, fine detail and perfect repetition across every panel. Choose from standard patterns or send us your own artwork and we will convert it into a cutting file.',
      'The panel is only half the job. Behind it sits a properly braced frame, because a large sheet with a lot of material cut away has less inherent stiffness than a solid one. We plan the frame and the cut pattern together so the finished gate is rigid, and we powder-coat after cutting so the exposed cut edges are sealed against rust.',
    ],
    features: [
      'CNC laser-cut MS or SS panels',
      'Standard patterns or your own artwork',
      'Braced frame designed around the cut pattern',
      'Powder coating seals all cut edges',
      'Optional backing sheet or acrylic for privacy',
      'Matching wicket gate and compound panels',
    ],
    specs: [
      { k: 'Panel Material', v: 'MS sheet / SS sheet' },
      { k: 'Sheet Thickness', v: '2mm – 4mm typical' },
      { k: 'Design', v: 'Standard or custom artwork' },
      { k: 'Finish', v: 'Powder coated' },
      { k: 'Lead Time', v: '25–35 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Bungalow main gates', 'Villa entrances', 'Facade screens', 'Compound panels'],
    faqs: [
      {
        q: 'Can you cut a design I found online?',
        a: 'Usually yes. Send it on WhatsApp and we will tell you whether it converts cleanly to a cutting file. Very fine detail sometimes needs adjusting so the pattern stays structurally connected once material is removed.',
      },
      {
        q: 'Do laser-cut gates rust at the cut edges?',
        a: 'They do if they are painted carelessly, because bare cut edges are exposed steel. We de-burr and powder-coat after cutting so every edge is sealed. That is the main reason we do not recommend brush enamel on laser-cut work.',
      },
      {
        q: 'Does the cut-out pattern reduce privacy?',
        a: 'Somewhat, by design. If you want the look with more privacy, we add a backing sheet or a tinted acrylic layer behind the panel in the same frame.',
      },
      {
        q: 'Why do laser-cut gates take longer?',
        a: 'The cutting is done on a CNC bed and then comes back to us for frame assembly, finishing and coating. That extra step typically adds a week over a plain fabricated gate.',
      },
    ],
    related: ['main-gates', 'sliding-gates', 'safety-doors', 'custom-steel-fabrication'],
    keywords: ['laser cut gate', 'CNC cut gate', 'designer main gate', 'laser cutting gate design'],
  },

  /* ─────────────────── DOORS & GRILLS ─────────────────── */
  {
    slug: 'safety-doors',
    name: 'Safety Doors',
    short: 'Safety Doors',
    category: 'Doors & Grills',
    priority: 1,
    image: '/projects/main-doors/ss-designer-main-door.webp',
    tagline: 'SS and MS security doors with multi-point locking',
    summary:
      'Flat-entrance safety doors in stainless or mild steel — strong frames, quality locks and designs that suit the doorway.',
    body: [
      'A safety door earns its name at the frame and the lock, not in the panel design. We fabricate the frame from heavy section, grout it into the wall opening rather than surface-fixing it, and fit locks that throw into the frame at multiple points so the door cannot be levered open at one weak spot.',
      'On the visible side you have plenty of choice — SS 304 with a mirror or matte finish, laser-cut MS panels, wooden-finish laminates, or a grill design that keeps airflow while the main door stays open. We build to your existing opening, so there is no gap-filling with plywood afterwards.',
    ],
    features: [
      'Heavy-section frame grouted into the opening',
      'Multi-point locking options',
      'SS 304, MS or wooden-finish laminate faces',
      'Grill designs for ventilation with security',
      'Peephole, letter slot and safety chain fitted',
      'Built to your exact opening size',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / MS' },
      { k: 'Locking', v: 'Multi-point / mortise' },
      { k: 'Finishes', v: 'Mirror, matte, laminate, powder coat' },
      { k: 'Fixing', v: 'Grouted frame' },
      { k: 'Lead Time', v: '18–25 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Flat entrances', 'Bungalow main doors', 'Office entries', 'Shop shutters side doors'],
    faqs: [
      {
        q: 'SS or MS for a safety door?',
        a: 'SS 304 needs no repainting and suits open corridors and coastal buildings. MS costs less and takes decorative laser-cut and powder-coated finishes well, and is fine in a sheltered internal lobby.',
      },
      {
        q: 'Can a safety door be fitted without breaking the existing frame?',
        a: 'In most flats yes — we fit inside the existing opening. If the old frame is rotted or badly out of square, replacing it gives a much better result and proper security.',
      },
      {
        q: 'Which lock should I choose?',
        a: 'For a main entrance we recommend a multi-point lock that engages the frame at top, middle and bottom. A single mortise lock, however good, gives a burglar one point to attack.',
      },
      {
        q: 'Can it match my wooden main door?',
        a: 'Yes. Wooden-finish laminates on a steel core are popular for exactly this — the security of steel with a finish that matches the interior door.',
      },
    ],
    related: ['main-gates', 'window-grills', 'safety-grills', 'laser-cut-gates'],
    keywords: ['safety door', 'security door', 'steel safety door', 'SS safety door design'],
  },
  {
    slug: 'window-grills',
    name: 'Window Grills',
    short: 'Window Grills',
    category: 'Doors & Grills',
    priority: 1,
    image: '/images/banner1.webp',
    tagline: 'Designer grills that secure without looking like bars',
    summary:
      'SS and MS window grills in modern, curved and traditional patterns — secure, child-safe and made to your opening.',
    body: [
      'Window grills have moved a long way from plain vertical bars. Curved SS members, geometric patterns and laser-cut panels give you the same security while looking like part of the elevation rather than a prison window — which matters when every flat in the building has them on show.',
      'Beyond looks, two details decide whether a grill is worth having: the fixing and the spacing. We fix into the structural reveal rather than into plaster, and keep vertical gaps tight enough that a small child cannot get through. Openable and removable sections are available where you need an emergency exit route.',
    ],
    features: [
      'Modern, curved, geometric or traditional patterns',
      'SS 304 or powder-coated MS',
      'Child-safe spacing under 100mm',
      'Fixed into structural reveal, not plaster',
      'Openable and removable sections available',
      'Mosquito mesh integration on request',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / MS' },
      { k: 'Bar Gap', v: 'Under 100mm (child safe)' },
      { k: 'Finish', v: 'Polish / powder coat' },
      { k: 'Options', v: 'Fixed, openable, removable' },
      { k: 'Lead Time', v: '12–18 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Apartment windows', 'Ground floor flats', 'Bungalow windows', 'Shop fronts'],
    faqs: [
      {
        q: 'What gap between bars is safe for children?',
        a: 'Under 100mm. A child can get their head through anything wider. We use this as the default on every residential grill, and tighten it further for windows in a child’s bedroom.',
      },
      {
        q: 'Can grills be opened in an emergency?',
        a: 'Yes — we can build one panel as an openable or quick-release section, latched from the inside. It is worth doing on at least one window per flat as a fire escape route.',
      },
      {
        q: 'Will grills block my view or airflow?',
        a: 'Airflow is unaffected. For the view, slim SS members in a wider spacing read much lighter than thick MS bars, and curved designs draw the eye along the pattern rather than blocking it.',
      },
      {
        q: 'Do I need society permission for window grills?',
        a: 'Many societies specify a common design so the elevation stays uniform. Check before ordering — we can fabricate to the approved society pattern.',
      },
    ],
    related: ['safety-grills', 'safety-doors', 'balcony-railings', 'aluminium-sliding-windows'],
    keywords: ['window grill', 'window grill design', 'SS window grill', 'MS window grill'],
  },
  {
    slug: 'safety-grills',
    name: 'Safety Grills',
    short: 'Safety Grills',
    category: 'Doors & Grills',
    priority: 2,
    image: '/projects/window-grills/ss-window-grill-apartment.webp',
    tagline: 'Balcony, duct and invisible grills for child safety',
    summary:
      'Safety grills for balconies, ducts and open shafts — including invisible cable grills that barely show from inside.',
    body: [
      'Safety grills are about preventing falls rather than deterring burglars, which changes what matters. The priority is a barrier a child cannot climb, squeeze through or dislodge — and in a high-rise flat, one that does not spoil the view you bought the flat for.',
      'Alongside conventional steel grills we fit invisible grills: tensioned stainless cables running vertically at close spacing, held in slim aluminium tracks at top and bottom. From a few feet away the cables all but disappear, while the spacing keeps children and pets safely inside.',
    ],
    features: [
      'Invisible cable grills with SS 316 wire',
      'Close cable spacing for child and pet safety',
      'Slim aluminium top and bottom tracks',
      'Conventional SS and MS grill options',
      'Duct, shaft and open-shaft covers',
      'Minimal visual impact from inside the flat',
    ],
    specs: [
      { k: 'Cable', v: 'SS 316 coated wire' },
      { k: 'Cable Spacing', v: 'Approx. 3 inches' },
      { k: 'Track', v: 'Powder-coated aluminium' },
      { k: 'Alt. Materials', v: 'SS 304 / MS grills' },
      { k: 'Lead Time', v: '12–18 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['High-rise balconies', 'Homes with toddlers', 'Pet safety', 'Duct and shaft covers'],
    faqs: [
      {
        q: 'Are invisible grills actually safe?',
        a: 'When installed correctly, yes — tensioned SS cable at close spacing in properly anchored tracks holds a child’s weight. The anchoring into sound structure is the critical part, and it is where cheap installations fail.',
      },
      {
        q: 'Do invisible grills rust?',
        a: 'We use SS 316 coated cable, which is the marine grade — a step above the SS 304 used elsewhere. That matters on a sea-facing balcony where ordinary wire would corrode.',
      },
      {
        q: 'Will a housing society object to invisible grills?',
        a: 'They are usually accepted precisely because they barely change the building elevation, which is what most societies care about. Confirm with your committee before ordering.',
      },
      {
        q: 'Invisible grills or a regular grill for a child?',
        a: 'Both work if the spacing is right. Invisible grills preserve the view and suit high floors; a conventional grill is sturdier against impact and costs less. We will talk through your balcony on the site visit.',
      },
    ],
    related: ['window-grills', 'balcony-railings', 'terrace-railings', 'residential-projects'],
    keywords: ['safety grill', 'invisible grill', 'balcony safety grill', 'child safety grill'],
  },

  /* ─────────────── SHEDS & STRUCTURES ─────────────── */
  {
    slug: 'canopy',
    name: 'Canopy',
    short: 'Canopy',
    category: 'Sheds & Structures',
    priority: 2,
    image: '/images/banner.jpg',
    // NEEDS PHOTO — using a workshop image until a real canopy job is shot.
    tagline: 'Polycarbonate and sheet canopies over doors and windows',
    summary:
      'Entrance, window and walkway canopies with polycarbonate or metal sheet roofing on a fabricated steel frame.',
    body: [
      'A canopy keeps monsoon rain off your entrance, stops sun beating on a window, and shelters a walkway between two blocks. We build the frame in MS or SS to suit exposure, then roof it in multi-wall polycarbonate for light transmission, or profiled metal sheet where you want full shade.',
      'The parts that get overlooked are drainage and noise. A canopy with too shallow a fall pools water and stains; one with an unsupported sheet span drums loudly in heavy rain. We set the slope to shed water clear of the walkway and space the purlins so the roof stays quiet and firm underfoot loads.',
    ],
    features: [
      'Multi-wall polycarbonate or profiled metal sheet',
      'MS or SS frame to suit exposure',
      'Correct fall and gutter detail — no pooling',
      'Purlin spacing set to keep rain noise down',
      'Wall-mounted or free-standing on posts',
      'Powder-coated or painted frame finish',
    ],
    specs: [
      { k: 'Roofing', v: 'Polycarbonate / metal sheet' },
      { k: 'Frame', v: 'MS or SS 304' },
      { k: 'Mounting', v: 'Wall bracket or post supported' },
      { k: 'Finish', v: 'Powder coated / enamel' },
      { k: 'Lead Time', v: '18–25 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Entrance porches', 'Window shades', 'Walkways', 'Shop fronts'],
    faqs: [
      {
        q: 'Polycarbonate or metal sheet?',
        a: 'Polycarbonate lets daylight through, which suits an entrance or a window where you do not want a dark patch. Metal sheet gives complete shade and costs less — better for parking and service areas.',
      },
      {
        q: 'Will the canopy leak where it meets the wall?',
        a: 'Not if the wall flashing is done properly. We tuck and seal the flashing into the wall rather than just siliconing the sheet edge, which is the usual reason cheap canopies leak in the second monsoon.',
      },
      {
        q: 'Can a canopy be fixed to an existing building without columns?',
        a: 'For modest projections, yes — cantilever brackets anchored into the structural wall. Longer projections need front posts or tension rods to stay rigid in wind.',
      },
      {
        q: 'How noisy is it in heavy rain?',
        a: 'Metal sheet is noticeably louder than polycarbonate, and both get louder if the purlins are too far apart. We space supports tighter over bedrooms and entrances.',
      },
    ],
    related: ['car-parking-shed', 'custom-steel-fabrication', 'commercial-projects', 'terrace-railings'],
    keywords: ['canopy', 'polycarbonate canopy', 'entrance canopy', 'window canopy shed'],
  },
  {
    slug: 'car-parking-shed',
    name: 'Car Parking Shed',
    short: 'Car Parking Shed',
    category: 'Sheds & Structures',
    priority: 2,
    image: '/images/banner2.jpg',
    // NEEDS PHOTO — replace with a real parking shed job when available.
    tagline: 'Tensile, polycarbonate and sheet parking structures',
    summary:
      'Car parking sheds for homes and societies — single or multi-car, in tensile fabric, polycarbonate or metal sheet.',
    body: [
      'A parking shed has to clear the vehicle, take monsoon wind loading, and stand on a foundation that will not shift. We size the columns and footings to the span rather than to a standard drawing, which matters most on multi-car society sheds where one long run covers several bays.',
      'For roofing you have three practical choices: tensile fabric for a modern look and good light, polycarbonate where you want brightness underneath, and profiled metal sheet as the most economical full-shade option. All three sit on a fabricated steel frame that we prime and coat for open-air exposure.',
    ],
    features: [
      'Tensile fabric, polycarbonate or metal sheet roofing',
      'Column and footing sized to the actual span',
      'Single-car to full society multi-bay runs',
      'Wind-rated bracing',
      'Gutter and downpipe drainage',
      'Zinc-primed and powder-coated frame',
    ],
    specs: [
      { k: 'Roofing', v: 'Tensile / polycarbonate / metal sheet' },
      { k: 'Frame', v: 'MS structural sections' },
      { k: 'Coating', v: 'Zinc primer + powder coat' },
      { k: 'Spans', v: 'Single bay to multi-bay runs' },
      { k: 'Lead Time', v: '25–40 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Society parking', 'Bungalow car porches', 'Office visitor parking', 'Two-wheeler sheds'],
    faqs: [
      {
        q: 'Which roofing lasts longest?',
        a: 'Properly coated metal sheet is the most durable and the cheapest. Polycarbonate can yellow slowly over many years in full sun. Good-quality tensile fabric lasts well and looks best, at the highest cost.',
      },
      {
        q: 'Do you handle society approvals?',
        a: 'We provide drawings, material specifications and photographs of similar work for you to submit to the committee. The approval itself has to come from the society, and we build to whatever they sanction.',
      },
      {
        q: 'What foundation is needed?',
        a: 'Concrete footings sized to the column load and soil. On existing paving we core out for the footings and reinstate the surface — surface-bolting a parking shed to a paver block is not safe in monsoon wind.',
      },
      {
        q: 'Can it be extended later?',
        a: 'Yes, if we know at the start. We can design the end bay so another span bolts on cleanly rather than needing the run to be rebuilt.',
      },
    ],
    related: ['canopy', 'industrial-projects', 'commercial-projects', 'custom-steel-fabrication'],
    keywords: ['car parking shed', 'parking shed', 'tensile parking structure', 'car shed fabrication'],
  },

  /* ─────────────── WINDOWS & GLASS ─────────────── */
  {
    slug: 'upvc-sliding-windows',
    name: 'UPVC Sliding Windows',
    short: 'UPVC Windows',
    category: 'Windows & Glass',
    priority: 2,
    image: '/images/glass.jpg',
    // NEEDS PHOTO — replace with a real UPVC installation photo.
    tagline: 'Sealed UPVC windows that cut dust, noise and rain',
    summary:
      'UPVC sliding windows with multi-chamber profiles and quality gaskets — genuinely weather-tight and low maintenance.',
    body: [
      'UPVC windows earn their place in Mumbai for one reason above all: they seal. A multi-chamber profile with proper gaskets and a drainage path keeps out driving monsoon rain, road dust and a meaningful amount of traffic noise, which single-glazed aluminium sliders never manage.',
      'The frame does not rot, rust or need painting, and the hardware is designed for the weight of the sash so it keeps sliding smoothly. We measure the opening, remove the old window, fit and seal the new frame, and finish the reveal properly so there is no gap left to fill with silicone.',
    ],
    features: [
      'Multi-chamber UPVC profiles',
      'EPDM gaskets and drainage channels',
      'Single or double glazing options',
      'Mosquito mesh track option',
      'Never needs painting — wipe clean',
      'Old window removal and reveal finishing included',
    ],
    specs: [
      { k: 'Profile', v: 'Multi-chamber UPVC' },
      { k: 'Glazing', v: 'Single / double glazed' },
      { k: 'Sealing', v: 'EPDM gaskets' },
      { k: 'Options', v: 'Mesh track, grill integration' },
      { k: 'Lead Time', v: '20–30 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Road-facing flats', 'Sea-facing homes', 'Bedrooms needing quiet', 'Full flat renovations'],
    faqs: [
      {
        q: 'UPVC or aluminium sliding windows?',
        a: 'UPVC seals better against rain, dust and noise, and needs no maintenance. Aluminium gives slimmer sightlines and more glass area, and suits large openings. For a noisy road-facing bedroom, UPVC is the clear choice.',
      },
      {
        q: 'Does double glazing actually help with noise?',
        a: 'Yes, noticeably — especially with different glass thicknesses in the two panes. But the seal matters as much as the glass: a well-gasketed single-glazed unit beats a poorly fitted double-glazed one.',
      },
      {
        q: 'Will UPVC yellow in the sun?',
        a: 'Good-quality profiles are UV-stabilised and hold their colour for many years. Very cheap unbranded profiles do yellow and go brittle, which is why we do not use them.',
      },
      {
        q: 'Can grills be fitted with UPVC windows?',
        a: 'Yes. We fix the grill to the structural reveal rather than to the UPVC frame itself, so the window frame carries no extra load.',
      },
    ],
    related: ['aluminium-sliding-windows', 'window-grills', 'glass-partitions', 'residential-projects'],
    keywords: ['UPVC windows', 'UPVC sliding window', 'UPVC window price', 'soundproof windows'],
  },
  {
    slug: 'aluminium-sliding-windows',
    name: 'Aluminium Sliding Windows',
    short: 'Aluminium Windows',
    category: 'Windows & Glass',
    priority: 2,
    image: '/images/glass.jpg',
    // NEEDS PHOTO — replace with a real aluminium window installation.
    tagline: 'Slim-profile aluminium sliders for maximum glass',
    summary:
      'Powder-coated aluminium sliding windows with slim sightlines — strong, light and ideal for large openings.',
    body: [
      'Aluminium sliders give you more glass and less frame. Because the metal is strong for its section size, the profiles can be slim while still carrying a large sash — which is exactly what you want on a wide living-room opening or a balcony enclosure where the view is the point.',
      'We use powder-coated sections with quality rollers and interlocks, on a track that drains outward so monsoon rain cannot back up over the sill. Mesh tracks, grill integration and toughened glass are all available, and the powder-coated finish never needs painting.',
    ],
    features: [
      'Slim powder-coated aluminium profiles',
      'Maximum glass area for the opening',
      'Quality rollers and interlocking sections',
      'Outward-draining sill track',
      'Toughened glass on request',
      'Mesh track and grill integration',
    ],
    specs: [
      { k: 'Profile', v: 'Powder-coated aluminium' },
      { k: 'Glazing', v: 'Plain / toughened / tinted' },
      { k: 'Tracks', v: '2 or 3 track' },
      { k: 'Finish', v: 'Standard and custom shades' },
      { k: 'Lead Time', v: '18–28 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Large living room openings', 'Balcony enclosures', 'Offices', 'Shop fronts'],
    faqs: [
      {
        q: 'How well do aluminium sliders keep rain out?',
        a: 'A well-made aluminium window with proper interlocks and a draining track handles normal rain fine. In heavily wind-driven rain on an exposed high floor, a gasketed UPVC unit seals better.',
      },
      {
        q: 'Two track or three track?',
        a: 'Three track lets you run a mosquito mesh panel alongside two glass sashes. Two track is fine where you do not need mesh or plan to fit a separate mesh frame.',
      },
      {
        q: 'Should the glass be toughened?',
        a: 'For large panels, low sill heights and anywhere children play, yes. For a small kitchen window, plain float glass is normally adequate.',
      },
      {
        q: 'Can you replace just the window and keep my grill?',
        a: 'Usually yes, if the grill is fixed to the reveal and is in good condition. We work around it, or remove and refit it as part of the job.',
      },
    ],
    related: ['upvc-sliding-windows', 'glass-partitions', 'window-grills', 'aluminium-glass-railings'],
    keywords: ['aluminium sliding window', 'aluminium windows', 'sliding window fabrication'],
  },
  {
    slug: 'glass-partitions',
    name: 'Glass Partitions',
    short: 'Glass Partitions',
    category: 'Windows & Glass',
    priority: 2,
    image: '/images/glass.jpg',
    // NEEDS PHOTO — replace with a real office partition job.
    tagline: 'Office and shower partitions in toughened glass',
    summary:
      'Toughened glass partitions for offices, cabins and bathrooms — framed, semi-frameless or fully frameless.',
    body: [
      'Glass partitions divide a space without darkening it, which is why offices use them for cabins and meeting rooms and why they have replaced shower curtains in most renovated bathrooms. We fabricate framed, semi-frameless and fully frameless systems in toughened glass.',
      'For office work we handle door provisions, patch fittings, floor springs and film or frosting for privacy bands. For bathrooms the priority is water: correct slope away from the opening, proper sealing at the wall channel, and hardware that will not corrode in constant humidity.',
    ],
    features: [
      '8mm / 10mm / 12mm toughened glass',
      'Framed, semi-frameless or frameless systems',
      'Patch fittings, floor springs and glass doors',
      'Frosted film or privacy bands',
      'Corrosion-resistant bathroom hardware',
      'Site-measured for tight, gap-free fits',
    ],
    specs: [
      { k: 'Glass', v: '8mm / 10mm / 12mm toughened' },
      { k: 'Systems', v: 'Framed / semi-frameless / frameless' },
      { k: 'Hardware', v: 'Patch fittings, floor springs' },
      { k: 'Privacy', v: 'Frosted, film, tinted' },
      { k: 'Lead Time', v: '18–28 days' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Office cabins', 'Meeting rooms', 'Shower enclosures', 'Shop and clinic interiors'],
    faqs: [
      {
        q: 'How thick should an office partition be?',
        a: '10mm or 12mm toughened for full-height partitions and glass doors. 8mm is adequate for smaller fixed panels within a frame.',
      },
      {
        q: 'How do I get privacy without losing light?',
        a: 'A frosted band at seated eye level is the usual answer — it screens the view while daylight still reaches the interior. Full frosting or switchable film are options for meeting rooms.',
      },
      {
        q: 'Do shower partitions leak?',
        a: 'Not if the slope runs into the shower area and the wall channel is sealed correctly. Most leaking enclosures we are called to fix have the fall running the wrong way, and no amount of silicone fixes that.',
      },
      {
        q: 'Can a partition be moved later?',
        a: 'Framed systems can be dismantled and re-erected fairly easily. Frameless glass is drilled and fitted for its exact position, so relocation usually means new panels.',
      },
    ],
    related: ['frameless-glass-railings', 'glass-railings', 'commercial-projects', 'aluminium-sliding-windows'],
    keywords: ['glass partition', 'office glass partition', 'shower glass partition', 'toughened glass partition'],
  },

  /* ─────────────── CUSTOM & PROJECTS ─────────────── */
  {
    slug: 'custom-steel-fabrication',
    name: 'Custom Steel Fabrication',
    short: 'Custom Fabrication',
    category: 'Custom & Projects',
    priority: 1,
    image: '/images/custom-door.jpg',
    tagline: 'Any shape, any size, any material — built to your drawing',
    summary:
      'One-off metalwork built from your drawing, photo or idea — furniture, structures, trolleys, frames and repairs.',
    body: [
      'Plenty of jobs do not fit a catalogue. A loft platform in an odd-shaped room, a steel base for a stone table top, a kitchen trolley sized to a specific gap, a repair to a structure nobody has drawings for any more. That is the work we take on as custom fabrication.',
      'Bring us a drawing, a photo, or just the measurements and what it needs to do. We will come back with a sketch and a price, fabricate it in our Mumbra workshop, and install it. We also do onsite welding and repair work where a piece cannot practically be brought to the shop.',
    ],
    features: [
      'Work from your drawing, photo or rough sketch',
      'SS, MS, aluminium and combinations',
      'Steel furniture, trolleys, counters and frames',
      'Loft platforms, mezzanines and support structures',
      'Onsite welding and repair service',
      'One-off pieces and small batch runs',
    ],
    specs: [
      { k: 'Materials', v: 'SS 304 / MS / Aluminium' },
      { k: 'Input', v: 'Drawing, photo or measurements' },
      { k: 'Services', v: 'Fabrication, install, onsite welding' },
      { k: 'Batch Size', v: 'Single piece upwards' },
      { k: 'Lead Time', v: 'Quoted per job' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Steel furniture', 'Kitchen trolleys & counters', 'Loft platforms', 'Repairs and modifications'],
    faqs: [
      {
        q: 'I only have a rough idea, not a drawing. Can you still quote?',
        a: 'Yes. Send measurements and a reference photo on WhatsApp and we will sketch it and quote. For anything structural we visit the site before finalising.',
      },
      {
        q: 'Do you take very small jobs?',
        a: 'We do — single-piece work is a large part of what we build. Small jobs are scheduled around larger projects, so the timeline depends on the current workload.',
      },
      {
        q: 'Can you weld on site?',
        a: 'Yes, for repairs, modifications and pieces too large to transport. Site conditions need to allow safe hot work, which we check first.',
      },
      {
        q: 'Will you copy a design from a photo?',
        a: 'We can build to a reference photo, adapted to your dimensions and site conditions. Exact replication of a copyrighted designer piece is not something we take on.',
      },
    ],
    related: ['ms-railings', 'laser-cut-gates', 'industrial-projects', 'canopy'],
    keywords: ['custom steel fabrication', 'metal fabrication', 'onsite welding', 'steel furniture fabrication'],
  },
  {
    slug: 'residential-projects',
    name: 'Residential Projects',
    short: 'Residential',
    category: 'Custom & Projects',
    priority: 2,
    image: '/projects/railings/ss-bungalow-balcony-railing-window-grill.jpg',
    tagline: 'Complete steelwork packages for homes and bungalows',
    summary:
      'All the metalwork for a home under one contractor — gate, railings, grills, safety door and windows, matched and scheduled.',
    body: [
      'When a house is being built or fully renovated, the steelwork spans several trades: a main gate, staircase and balcony railings, window grills, a safety door, sometimes windows and a canopy. Splitting that across different fabricators means mismatched finishes and endless coordination.',
      'We take the whole package. One measurement round, one design language across every element, one delivery schedule sequenced with your civil and interior work so items arrive when the site is ready for them — not weeks early to be damaged, or late to hold up handover.',
    ],
    features: [
      'Gate, railings, grills, doors and windows together',
      'Consistent design and finish throughout the home',
      'Single point of contact and one schedule',
      'Sequenced with civil and interior work',
      'Site measurement at the right construction stage',
      'Snag list closed before final handover',
    ],
    specs: [
      { k: 'Scope', v: 'Full home steelwork package' },
      { k: 'Materials', v: 'SS 304 / MS / Glass / Aluminium' },
      { k: 'Coordination', v: 'Phased to site progress' },
      { k: 'Project Size', v: 'Flats to bungalows' },
      { k: 'Lead Time', v: 'Scheduled per project' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['New bungalows', 'Full flat renovations', 'Row house projects', 'Villa handovers'],
    faqs: [
      {
        q: 'When should steelwork be measured during construction?',
        a: 'After plaster and flooring levels are fixed, because both change the final opening sizes. Measuring too early is the single most common cause of ill-fitting gates and grills.',
      },
      {
        q: 'Can you work alongside my interior contractor?',
        a: 'Yes, and it usually goes better that way. We coordinate on levels, openings and sequencing so nobody is waiting on the other and finished surfaces do not get damaged.',
      },
      {
        q: 'Is a package cheaper than ordering items separately?',
        a: 'Generally yes — one measurement round, shared material purchase and fewer installation visits. The bigger gain is that everything matches and the schedule holds.',
      },
      {
        q: 'Do you handle payments in stages?',
        a: 'Yes, we work to a staged schedule tied to project milestones. The terms are set out in the quotation before work starts.',
      },
    ],
    related: ['staircase-railings', 'main-gates', 'safety-doors', 'window-grills'],
    keywords: ['residential steel fabrication', 'home steel work', 'bungalow fabrication'],
  },
  {
    slug: 'commercial-projects',
    name: 'Commercial Projects',
    short: 'Commercial',
    category: 'Custom & Projects',
    priority: 2,
    image: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
    tagline: 'Shopfronts, showrooms, offices and food service steelwork',
    summary:
      'Steel and glass work for commercial premises — shopfronts, partitions, railings, counters and food-service equipment.',
    body: [
      'Commercial jobs run on deadlines. A showroom opening date does not move because a railing is late, so we work to the fit-out programme and, where the premises are trading, schedule installation outside business hours.',
      'The work covers shopfront framing, glass partitions and doors, stair and mezzanine railings, display and service counters, and stainless steel equipment for food businesses — carts, prep counters and shelving in food-grade SS that will survive daily cleaning.',
    ],
    features: [
      'Shopfront framing and glass doors',
      'Office partitions and cabin glazing',
      'Mezzanine and stair railings',
      'Display, reception and service counters',
      'Food-grade SS carts, counters and shelving',
      'Out-of-hours installation for trading premises',
    ],
    specs: [
      { k: 'Scope', v: 'Shopfronts, partitions, counters, railings' },
      { k: 'Materials', v: 'SS 304 / MS / Toughened glass' },
      { k: 'Scheduling', v: 'Fit-out programme aligned' },
      { k: 'Installation', v: 'Out-of-hours available' },
      { k: 'Lead Time', v: 'Quoted per project' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Showrooms', 'Offices', 'Restaurants & cafes', 'Clinics and retail'],
    faqs: [
      {
        q: 'Can you install without closing my shop?',
        a: 'Yes. Most commercial installations we do are scheduled at night or on the weekly off day. Say so at quoting stage so the labour is planned for it.',
      },
      {
        q: 'Do you supply food-grade stainless steel?',
        a: 'Yes — SS 304 for food-contact counters, carts and shelving, finished so there are no crevices where residue can collect and with rounded, cleanable corners.',
      },
      {
        q: 'Can you work to an architect’s drawings?',
        a: 'Yes. Send the drawings and we will confirm fabrication details and flag anything that will not work on site before anything is cut.',
      },
      {
        q: 'How firm are your commercial timelines?',
        a: 'We commit to a date after the site visit and material confirmation, and we tell you immediately if anything threatens it. We would rather quote a realistic date than a convenient one.',
      },
    ],
    related: ['glass-partitions', 'custom-steel-fabrication', 'industrial-projects', 'canopy'],
    keywords: ['commercial steel fabrication', 'shopfront fabrication', 'office glass partition'],
  },
  {
    slug: 'industrial-projects',
    name: 'Industrial Projects',
    short: 'Industrial',
    category: 'Custom & Projects',
    priority: 2,
    image: '/projects/railings/ss-mezzanine-railing-metal-stairs.webp',
    tagline: 'Structural steel, platforms, mezzanines and safety systems',
    summary:
      'Heavy-duty fabrication for factories and warehouses — mezzanine floors, access platforms, stairs and safety railings.',
    body: [
      'Industrial fabrication is judged on load, access and safety rather than on finish. Mezzanine floors, machine platforms, access stairs, walkways and handrail systems all have to carry their design load with margin, and be reachable safely by the people who use them every shift.',
      'We fabricate structural sections, industrial staircases with proper going and rise, chequered plate decking, toe boards and guardrails, plus support frames for equipment. Work is planned around plant shutdown windows so production loses as little time as possible.',
    ],
    features: [
      'Mezzanine floors and machine platforms',
      'Industrial staircases and access ladders',
      'Chequered plate decking and walkways',
      'Guardrails with toe boards',
      'Equipment support frames and skids',
      'Shutdown-window scheduling',
    ],
    specs: [
      { k: 'Sections', v: 'MS structural — angle, channel, ISMB' },
      { k: 'Decking', v: 'Chequered plate / grating' },
      { k: 'Safety', v: 'Guardrail + toe board' },
      { k: 'Coating', v: 'Zinc primer + industrial enamel' },
      { k: 'Lead Time', v: 'Quoted per project' },
      { k: 'Warranty', v: '2 years on workmanship' },
    ],
    useCases: ['Factories', 'Warehouses', 'Godowns', 'Workshops'],
    faqs: [
      {
        q: 'Can you work during a plant shutdown?',
        a: 'Yes, and we prefer to. Give us the shutdown dates early so material and labour are staged in advance and the erection window is used fully.',
      },
      {
        q: 'Do you fabricate to structural drawings?',
        a: 'Yes. Send the drawings and load requirements. Where drawings do not exist we survey the site and work to the loads you specify — we will not guess a load rating.',
      },
      {
        q: 'What decking is best for a mezzanine?',
        a: 'Chequered plate for general storage and foot traffic. Grating where you need drainage, light transfer or ventilation between levels, such as over machinery.',
      },
      {
        q: 'How do you handle safety on site?',
        a: 'Hot work is coordinated with your safety team, areas are barricaded, and our fitters work to your plant’s permit system. We follow your site rules, not our own convenience.',
      },
    ],
    related: ['custom-steel-fabrication', 'car-parking-shed', 'commercial-projects', 'ms-railings'],
    keywords: ['industrial fabrication', 'mezzanine floor', 'structural steel fabrication', 'industrial staircase'],
  },
];

/* ─────────────────────── LOOKUPS ─────────────────────── */

export const SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));

export const getService = (slug) => SERVICE_MAP[slug] ?? null;

/** Services shown on the homepage grid. */
export const TOP_SERVICES = SERVICES.filter((s) => s.priority === 1);

/** Services that also get city pages in extended-tier cities.
 *  Same set as the homepage grid today — split them if that changes. */
export const EXTENDED_CITY_SERVICES = TOP_SERVICES;

export const servicesByCategory = () =>
  SERVICE_CATEGORIES.map((category) => ({
    category,
    items: SERVICES.filter((s) => s.category === category),
  })).filter((g) => g.items.length > 0);
