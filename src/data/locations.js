/* ═══════════════════════════════════════════════════════════════
   LOCATIONS — Maharashtra cities served.
   ───────────────────────────────────────────────────────────────
   TIERS — this is the one setting that controls how many pages
   the site generates. Change a city's tier and rebuild.

     'core'      Daily service area. Gets a city page AND a page
                 for EVERY service. These are the pages that can
                 realistically rank and convert, because the
                 workshop is close enough for free site visits.

     'extended'  Reachable for project work. Gets a city page and
                 pages for the priority services only (the ones
                 marked priority: 1 in src/data/services.js).

     'listed'    Mentioned on the coverage page only. No pages
                 generated. Use this for cities you would take a
                 job in but do not want to build content for yet.

   HONESTY NOTE — worth reading before you promote a city to
   'core'. Google ranks local queries on real local signals:
   proximity, a Google Business Profile at that address, reviews
   from that area, and local citations. A page alone will not put
   you above a fabricator who actually sits in that city. For
   cities outside the MMR, the copy says plainly that the workshop
   is in Mumbra and the work is taken on a project basis — that is
   both true and far more likely to survive a spam update than
   pretending to have a branch in every city.

   FIELDS
     areas    Localities used in the page copy and internal links.
              Keep these accurate — wrong locality names read as
              spam to a local reader.
     note     One or two sentences UNIQUE to this city. This is
              what stops 300 city pages from being the same page.
              If you add a city, write a real note for it.
═══════════════════════════════════════════════════════════════ */

export const WORKSHOP = {
  city: 'Mumbra',
  district: 'Thane',
  region: 'Mumbai Metropolitan Region',
  state: 'Maharashtra',
};

export const LOCATIONS = [
  /* ══════════ CORE — daily service area (MMR) ══════════ */
  {
    slug: 'mumbra',
    name: 'Mumbra',
    district: 'Thane',
    tier: 'core',
    areas: ['Kausa', 'Amrut Nagar', 'Shil Phata', 'Rashid Compound', 'Almas Colony', 'Mumbra Devi Road'],
    nearby: ['kalwa', 'diva', 'thane', 'kalyan'],
    note:
      'Mumbra is home — our workshop sits here, off the Mumbra-Panvel highway near International Kata. Most Mumbra jobs get a site visit the same day you call, and installation teams are minutes away if anything needs adjusting after handover.',
  },
  {
    slug: 'thane',
    name: 'Thane',
    district: 'Thane',
    tier: 'core',
    areas: ['Ghodbunder Road', 'Majiwada', 'Wagle Estate', 'Kolshet', 'Naupada', 'Kasarvadavali', 'Manpada', 'Balkum'],
    nearby: ['mumbra', 'kalwa', 'bhiwandi', 'mumbai'],
    note:
      'Thane is our largest market outside Mumbra, and the mix is distinctive: high-rise balcony railings and safety grills along Ghodbunder Road, staircase railings in the older Naupada bungalows, and industrial fabrication around Wagle Estate.',
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    district: 'Mumbai',
    tier: 'core',
    areas: ['Mulund', 'Bhandup', 'Ghatkopar', 'Powai', 'Vikhroli', 'Chembur', 'Andheri', 'Borivali', 'Malad', 'Dadar'],
    nearby: ['thane', 'navi-mumbai', 'mira-bhayandar'],
    note:
      'Mumbai work is dominated by flats rather than plots — balcony railings, safety doors and invisible grills, usually with a society design to match and a lift that decides the maximum section length we can carry up. We plan both into the quotation.',
  },
  {
    slug: 'kalwa',
    name: 'Kalwa',
    district: 'Thane',
    tier: 'core',
    areas: ['Kharegaon', 'Vitava', 'Parsik Nagar', 'Atkoni', 'Kalwa Naka'],
    nearby: ['mumbra', 'thane', 'diva'],
    note:
      'Kalwa is a short run from the workshop across the creek, so site visits and small repair jobs here are easy to schedule. A lot of our Kalwa work is window grills and compound gates for independent houses in Kharegaon and Vitava.',
  },
  {
    slug: 'diva',
    name: 'Diva',
    district: 'Thane',
    tier: 'core',
    areas: ['Diva Gaon', 'Sabe Gaon', 'Betawade', 'Agasan', 'Diva East'],
    nearby: ['mumbra', 'kalwa', 'dombivli'],
    note:
      'Diva sits between Mumbra and Dombivli, and much of the building stock is newer low-rise construction — which means a steady stream of first-fit work: main gates, window grills and staircase railings on buildings that have just been handed over.',
  },
  {
    slug: 'navi-mumbai',
    name: 'Navi Mumbai',
    district: 'Thane / Raigad',
    tier: 'core',
    areas: ['Vashi', 'Nerul', 'Belapur', 'Kharghar', 'Airoli', 'Ghansoli', 'Kopar Khairane', 'Seawoods', 'Ulwe'],
    nearby: ['panvel', 'mumbai', 'thane'],
    note:
      'Navi Mumbai is planned, which shows in the work — wide balconies that suit glass railings, sea-facing towers in Seawoods and Nerul where SS 304 fittings are non-negotiable, and society committees that usually specify one approved design for the whole building.',
  },
  {
    slug: 'kalyan',
    name: 'Kalyan',
    district: 'Thane',
    tier: 'core',
    areas: ['Kalyan West', 'Kalyan East', 'Khadakpada', 'Adharwadi', 'Barave', 'Godrej Hill'],
    nearby: ['dombivli', 'ulhasnagar', 'bhiwandi', 'ambernath'],
    note:
      'Kalyan mixes dense older neighbourhoods with the newer Khadakpada and Godrej Hill developments. Access is the planning point here — in the older lanes we fabricate in sections sized to what can actually be carried in, rather than what fits on a truck.',
  },
  {
    slug: 'dombivli',
    name: 'Dombivli',
    district: 'Thane',
    tier: 'core',
    areas: ['Dombivli East', 'Dombivli West', 'MIDC Dombivli', 'Manpada Road', 'Thakurli', 'Kopar'],
    nearby: ['kalyan', 'diva', 'ambernath'],
    note:
      'Dombivli gives us two very different job types on the same day: residential railings and grills in the town, and heavier structural fabrication, platforms and safety railings for units inside Dombivli MIDC.',
  },
  {
    slug: 'bhiwandi',
    name: 'Bhiwandi',
    district: 'Thane',
    tier: 'core',
    areas: ['Kalyan Road', 'Kamatghar', 'Narpoli', 'Anjur Phata', 'Dhamankar Naka', 'Temghar'],
    nearby: ['thane', 'kalyan', 'mumbra'],
    note:
      'Bhiwandi is warehouse country, and the work reflects it — sliding gates wide enough for container traffic, mezzanine platforms, access staircases and guardrails inside godowns, usually scheduled around loading hours.',
  },
  {
    slug: 'ulhasnagar',
    name: 'Ulhasnagar',
    district: 'Thane',
    tier: 'core',
    areas: ['Camp 1', 'Camp 2', 'Camp 3', 'Camp 4', 'Camp 5', 'Netaji Chowk', 'Shahad'],
    nearby: ['kalyan', 'ambernath', 'badlapur'],
    note:
      'Ulhasnagar has a strong local manufacturing and trading base, so a good share of our work here is commercial — shopfront framing, shutters-adjacent safety doors, display counters and stainless steel fittings for shops around the Camp markets.',
  },
  {
    slug: 'ambernath',
    name: 'Ambernath',
    district: 'Thane',
    tier: 'core',
    areas: ['Ambernath East', 'Ambernath West', 'MIDC Ambernath', 'Morivali', 'Kansai'],
    nearby: ['badlapur', 'ulhasnagar', 'kalyan'],
    note:
      'Ambernath splits neatly between the residential east and west sides and the MIDC belt. Plot sizes here are generous compared with Mumbai, so main gates and compound work make up more of our Ambernath jobs than balcony railings do.',
  },
  {
    slug: 'badlapur',
    name: 'Badlapur',
    district: 'Thane',
    tier: 'core',
    areas: ['Badlapur East', 'Badlapur West', 'Katrap', 'Belavali', 'Manjarli'],
    nearby: ['ambernath', 'ulhasnagar', 'kalyan'],
    note:
      'Badlapur is still building out, and row houses and independent plots are common — which puts main gates, compound railings and full-home steelwork packages at the top of our list here rather than one-off flat jobs.',
  },
  {
    slug: 'panvel',
    name: 'Panvel',
    district: 'Raigad',
    tier: 'core',
    areas: ['Old Panvel', 'New Panvel', 'Kamothe', 'Kalamboli', 'Khanda Colony', 'Taloja'],
    nearby: ['navi-mumbai', 'karjat'],
    note:
      'Panvel has grown quickly around the new airport corridor, and a lot of our work here is on recently handed-over flats and row houses in Kamothe, Kalamboli and Khanda Colony — grills, safety doors and balcony railings fitted before families move in.',
  },
  {
    slug: 'mira-bhayandar',
    name: 'Mira-Bhayandar',
    district: 'Thane',
    tier: 'core',
    areas: ['Mira Road', 'Bhayandar East', 'Bhayandar West', 'Kashimira', 'Naya Nagar'],
    nearby: ['mumbai', 'vasai-virar', 'thane'],
    note:
      'Mira-Bhayandar is dense mid-rise housing, and the creek-side location means salt in the air. We push SS 304 fittings and marine-grade fasteners here more firmly than almost anywhere else — ordinary hardware streaks the facade with rust within a couple of monsoons.',
  },
  {
    slug: 'vasai-virar',
    name: 'Vasai-Virar',
    district: 'Palghar',
    tier: 'core',
    areas: ['Vasai West', 'Vasai East', 'Nalasopara', 'Virar East', 'Virar West', 'Naigaon'],
    nearby: ['mira-bhayandar', 'palghar'],
    note:
      'Vasai-Virar covers a wide spread from old Vasai bungalows with traditional wrought-iron gates to new towers in Virar. We batch deliveries for this belt so a single site visit and a single trip covers a full job rather than several part-loads.',
  },

  /* ══════════ EXTENDED — project-basis service ══════════ */
  {
    slug: 'pune',
    name: 'Pune',
    district: 'Pune',
    tier: 'extended',
    areas: ['Kothrud', 'Baner', 'Wakad', 'Hinjewadi', 'Kharadi', 'Hadapsar', 'Viman Nagar'],
    nearby: [],
    note:
      'Pune projects are taken on a project basis from our Mumbra workshop — practical for full-home packages, bungalow gates and commercial fit-outs where one measurement visit and one delivery covers the job, rather than for a single window grill.',
  },
  {
    slug: 'nashik',
    name: 'Nashik',
    district: 'Nashik',
    tier: 'extended',
    areas: ['Gangapur Road', 'College Road', 'Indira Nagar', 'Panchavati', 'Satpur', 'Ambad'],
    nearby: [],
    note:
      'We take Nashik work as scheduled project trips, most often bungalow gates, staircase railings and industrial fabrication for units in the Satpur and Ambad belts, where a single mobilisation covers the full scope.',
  },
  {
    slug: 'nagpur',
    name: 'Nagpur',
    district: 'Nagpur',
    tier: 'extended',
    areas: ['Dharampeth', 'Sadar', 'Manish Nagar', 'Wardha Road', 'Hingna'],
    nearby: [],
    note:
      'Nagpur is a long haul from Mumbra, so we quote it only for substantial project work — full-building railing packages, structural and mezzanine fabrication — where the scope justifies transporting a fabricated consignment and an installation crew.',
  },
  {
    slug: 'chhatrapati-sambhajinagar',
    name: 'Chhatrapati Sambhajinagar',
    district: 'Chhatrapati Sambhajinagar',
    tier: 'extended',
    areas: ['CIDCO', 'Garkheda', 'Waluj', 'Jalna Road', 'Chikalthana'],
    nearby: [],
    note:
      'Formerly Aurangabad, and a strong industrial base — the enquiries we get from here are mostly factory-side: access platforms, guardrails and equipment support frames for units around Waluj and Chikalthana.',
  },
  {
    slug: 'kolhapur',
    name: 'Kolhapur',
    district: 'Kolhapur',
    tier: 'extended',
    areas: ['Rajarampuri', 'Shivaji Peth', 'Kasba Bawada', 'Shahupuri'],
    nearby: [],
    note:
      'Kolhapur homes lean traditional, and the requests reflect that — wrought-iron main gates, decorative MS railings and scroll work rather than the frameless glass that dominates Mumbai enquiries.',
  },
  {
    slug: 'solapur',
    name: 'Solapur',
    district: 'Solapur',
    tier: 'extended',
    areas: ['Hotgi Road', 'Vijapur Road', 'Akkalkot Road', 'MIDC Solapur'],
    nearby: [],
    note:
      'Solapur work comes to us mainly through the textile and processing units on the MIDC side — structural fabrication, platforms and safety railings taken up as planned project trips.',
  },
  {
    slug: 'amravati',
    name: 'Amravati',
    district: 'Amravati',
    tier: 'extended',
    areas: ['Rajapeth', 'Camp Area', 'Badnera', 'MIDC Amravati'],
    nearby: [],
    note:
      'Amravati enquiries are typically full-scope: a complete house package or a commercial fit-out. We consolidate fabrication in Mumbra and mobilise once, which keeps the transport share of the cost sensible.',
  },
  {
    slug: 'nanded',
    name: 'Nanded',
    district: 'Nanded',
    tier: 'extended',
    areas: ['Vazirabad', 'Shivaji Nagar', 'CIDCO Nanded', 'Taroda'],
    nearby: [],
    note:
      'Nanded is served on a project basis. Given the distance, we work to a firm approved drawing before fabrication starts — site alterations after delivery are impractical at this range, so the measurement stage carries extra weight.',
  },
  {
    slug: 'sangli',
    name: 'Sangli',
    district: 'Sangli',
    tier: 'extended',
    areas: ['Vishrambag', 'Miraj Road', 'Madhavnagar', 'MIDC Kupwad'],
    nearby: [],
    note:
      'Most Sangli enquiries reach us for bungalow gates and staircase railings on new independent houses, plus occasional fabrication for the food-processing units around Kupwad.',
  },
  {
    slug: 'jalgaon',
    name: 'Jalgaon',
    district: 'Jalgaon',
    tier: 'extended',
    areas: ['Ring Road', 'Mehrun', 'MIDC Jalgaon', 'Shivaji Nagar'],
    nearby: [],
    note:
      'Jalgaon projects are handled as planned trips with the fabrication completed in Mumbra first. Bungalow main gates and full-house railing packages make up most of what we are asked for here.',
  },
  {
    slug: 'akola',
    name: 'Akola',
    district: 'Akola',
    tier: 'extended',
    areas: ['Civil Lines', 'Ratanlal Plot', 'MIDC Akola', 'Gorakshan Road'],
    nearby: [],
    note:
      'Akola work is taken on a project basis for substantial scopes — typically a complete residential steel package or an industrial railing and platform contract for a single site.',
  },
  {
    slug: 'latur',
    name: 'Latur',
    district: 'Latur',
    tier: 'extended',
    areas: ['Ausa Road', 'Barshi Road', 'MIDC Latur', 'Shivaji Chowk'],
    nearby: [],
    note:
      'For Latur we quote whole-project scopes rather than individual items. Drawings are approved and materials confirmed before fabrication so the installation crew travels once and finishes in one visit.',
  },
  {
    slug: 'ahilyanagar',
    name: 'Ahilyanagar',
    district: 'Ahilyanagar',
    tier: 'extended',
    areas: ['Savedi', 'Kedgaon', 'MIDC Nagar', 'Station Road'],
    nearby: [],
    note:
      'Ahilyanagar — formerly Ahmednagar — sits within a manageable trip of the MMR, which makes bungalow gate and railing packages here practical to take on as a scheduled project.',
  },
  {
    slug: 'chandrapur',
    name: 'Chandrapur',
    district: 'Chandrapur',
    tier: 'extended',
    areas: ['Civil Lines', 'MIDC Chandrapur', 'Ballarpur Road'],
    nearby: [],
    note:
      'Chandrapur enquiries are almost entirely industrial — structural steel, platforms, walkways and guardrails for plant sites, scheduled into shutdown windows and quoted as complete contracts.',
  },
  {
    slug: 'satara',
    name: 'Satara',
    district: 'Satara',
    tier: 'extended',
    areas: ['Powai Naka', 'Sadar Bazar', 'MIDC Satara', 'Karad Road'],
    nearby: [],
    note:
      'Satara and the surrounding hill belt bring us farmhouse and second-home work — compound gates, veranda railings and canopies built to stand up to heavy monsoon exposure.',
  },
  {
    slug: 'ratnagiri',
    name: 'Ratnagiri',
    district: 'Ratnagiri',
    tier: 'extended',
    areas: ['Maruti Mandir', 'MIDC Mirjole', 'Nachane', 'Ratnagiri Town'],
    nearby: [],
    note:
      'Ratnagiri is coastal, and that decides the specification before anything else: SS 304 throughout, marine-grade fasteners, and no compromise on coating for any mild steel that goes near open air.',
  },
  {
    slug: 'palghar',
    name: 'Palghar',
    district: 'Palghar',
    tier: 'extended',
    areas: ['Palghar Town', 'Boisar', 'Tarapur MIDC', 'Manor'],
    nearby: ['vasai-virar'],
    note:
      'Palghar and the Tarapur MIDC belt are within comfortable reach up the western corridor, so we take both residential and industrial work here — including structural fabrication for units around Boisar and Tarapur.',
  },
  {
    slug: 'alibaug',
    name: 'Alibaug',
    district: 'Raigad',
    tier: 'extended',
    areas: ['Alibaug Town', 'Kihim', 'Awas', 'Nagaon', 'Chondi'],
    nearby: ['panvel'],
    note:
      'Alibaug is second-home territory, and the sea air is unforgiving. Weekend homes here get SS 304 railings, marine-grade fixings and powder-coated frames as standard — anything less looks tired within two seasons.',
  },
  {
    slug: 'karjat',
    name: 'Karjat',
    district: 'Raigad',
    tier: 'extended',
    areas: ['Karjat Town', 'Neral', 'Kashele', 'Bhivpuri Road'],
    nearby: ['panvel', 'badlapur'],
    note:
      'Karjat and Neral are close enough to the Badlapur side of our route to be practical. Farmhouse gates, veranda railings and parking canopies for weekend homes make up most of the work here.',
  },
  {
    slug: 'boisar',
    name: 'Boisar',
    district: 'Palghar',
    tier: 'extended',
    areas: ['Boisar East', 'Boisar West', 'Tarapur MIDC', 'Betegaon'],
    nearby: ['palghar'],
    note:
      'Boisar is driven by the Tarapur industrial belt, so the enquiries are mostly plant-side — mezzanine floors, access staircases, walkway guardrails and equipment frames, planned around production schedules.',
  },

  /* ══════════ LISTED — coverage only, no pages ══════════ */
  { slug: 'wardha',    name: 'Wardha',    district: 'Wardha',    tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'jalna',     name: 'Jalna',     district: 'Jalna',     tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'beed',      name: 'Beed',      district: 'Beed',      tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'dhule',     name: 'Dhule',     district: 'Dhule',     tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'parbhani',  name: 'Parbhani',  district: 'Parbhani',  tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'osmanabad', name: 'Dharashiv', district: 'Dharashiv', tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'yavatmal',  name: 'Yavatmal',  district: 'Yavatmal',  tier: 'listed', areas: [], nearby: [], note: '' },
  { slug: 'gondia',    name: 'Gondia',    district: 'Gondia',    tier: 'listed', areas: [], nearby: [], note: '' },
];

/* ─────────────────────── LOOKUPS ─────────────────────── */

export const LOCATION_MAP = Object.fromEntries(LOCATIONS.map((l) => [l.slug, l]));

export const getLocation = (slug) => LOCATION_MAP[slug] ?? null;

export const CORE_LOCATIONS = LOCATIONS.filter((l) => l.tier === 'core');
export const EXTENDED_LOCATIONS = LOCATIONS.filter((l) => l.tier === 'extended');
export const LISTED_LOCATIONS = LOCATIONS.filter((l) => l.tier === 'listed');

/** Every city that gets its own page. */
export const PAGE_LOCATIONS = LOCATIONS.filter((l) => l.tier !== 'listed');

/** True when this city is inside the daily, free-site-visit service area. */
export const isLocalArea = (location) => location?.tier === 'core';
