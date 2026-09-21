/* ═══════════════════════════════════════════════════════════════
   REELS — homepage video rail
   ───────────────────────────────────────────────────────────────
   HOW TO ADD A REEL
   1. Upload the vertical (9:16) video to S3 / CloudFront as .mp4
      (H.264 + AAC, max ~1080x1920, keep each file under ~15 MB
      so it loads fast on mobile data).
   2. Paste the public URL into `src` below.
   3. Optional but recommended: upload a still frame of the video
      (.webp/.jpg) and put its URL in `poster`. A poster from
      /public also works — that is what is used right now.

   Notes
   • A reel with an empty `src` still shows its poster card; the
     play button becomes active as soon as a URL is added.
   • Order in this array = order in the rail (left → right).
   • Keep `title` descriptive — it is read by screen readers and
     shown under each card, which also helps SEO.
═══════════════════════════════════════════════════════════════ */

export const REELS = [
  {
    id: 'reel-ss-railing',
    title: 'SS Balcony Railing Installation',
    category: 'Railings',
    location: 'Thane',
    src: '', // e.g. 'https://xxxxxxxx.cloudfront.net/reels/ss-balcony-railing.mp4'
    poster: '/projects/railings/ss-balcony-railing-designer.webp',
  },
  {
    id: 'reel-main-gate',
    title: 'Laser Cut Designer Main Gate',
    category: 'Main Gates',
    location: 'Mumbra',
    src: '',
    poster: '/projects/main-gates/laser-cut-steel-main-gate.webp',
  },
  {
    id: 'reel-window-grill',
    title: 'Modern Window Grill Fitting',
    category: 'Window Grills',
    location: 'Mumbai',
    src: '',
    poster: '/projects/window-grills/stainless-steel-window-grill-modern.webp',
  },
  {
    id: 'reel-main-door',
    title: 'SS Main Door — Wooden Finish',
    category: 'Main Doors',
    location: 'Thane',
    src: '',
    poster: '/projects/main-doors/ss-main-door-wooden-finish.webp',
  },
  {
    id: 'reel-staircase',
    title: 'Staircase Railing Fabrication',
    category: 'Railings',
    location: 'Mumbai',
    src: '',
    poster: '/projects/railings/stainless-steel-staircase-railing.webp',
  },
  {
    id: 'reel-collapsible-gate',
    title: 'Collapsible Security Gate',
    category: 'Gates',
    location: 'Mumbra',
    src: '',
    poster: '/projects/collapsible-gates/collapsible-steel-gate.webp',
  },
  {
    id: 'reel-food-cart',
    title: 'Stainless Steel Food Cart Build',
    category: 'Street Stalls',
    location: 'Thane',
    src: '',
    poster: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
  },
  {
    id: 'reel-wrought-iron-gate',
    title: 'Wrought Iron Designer Gate',
    category: 'Main Gates',
    location: 'Mumbai',
    src: '',
    poster: '/projects/main-gates/wrought-iron-designer-main-gate-gold.webp',
  },
];

export default REELS;
