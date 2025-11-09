'use client';

import React, { useId, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaChevronRight, FaPhoneAlt } from 'react-icons/fa';

/**
 * Services page with Quick Quote modal that sends an email via /api/contact
 * - QuickQuoteModal posts to /api/contact (same handler as Contact page)
 * - Modal includes simple client-side validation and shows success/error UI
 * - Replace image paths in SERVICES if needed
 */

const SERVICES = [
  {
    id: 'railings',
    title: 'SS / MS Railings',
    category: 'Residential',
    description:
      'Custom stainless steel and mild steel railings for staircases, balconies and terraces — engineered for safety and style.',
    features: ['Custom designs', 'Powder coating', 'Indoor & outdoor', 'Durable finish'],
    image: '/projects/railings/stainless-steel-staircase-railing.webp',
  },
  {
    id: 'security-gates',
    title: 'Security Doors & Gates',
    category: 'Security',
    description:
      'Robust security doors and gates with multi-point locking and reinforced frames for maximum protection.',
    features: ['Burglar-proof', 'Multi-lock systems', 'Custom sizes', 'Decorative options'],
    image: '/projects/main-gates/stainless-steel-main-gate-house.webp',
  },
  {
    id: 'window-grills',
    title: 'Balcony & Window Grills',
    category: 'Residential',
    description:
      'Aesthetic grills that do not compromise ventilation — anti-climb and weather-resistant designs.',
    features: ['Pattern variety', 'Anti-climb', 'Weather resistant', 'Low maintenance'],
    image: '/projects/window-grills/stainless-steel-window-grill-modern.webp',
  },
  {
    id: 'kitchen',
    title: 'Kitchen Trolleys & Counters',
    category: 'Commercial',
    description:
      'Hygienic stainless-steel trolleys and counters for commercial kitchens — modular and easy to sanitize.',
    features: ['Food-grade steel', 'Modular', 'Easy cleaning', 'Space saving'],
    image: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
  },
  {
    id: 'structures',
    title: 'Industrial & Commercial Structures',
    category: 'Commercial',
    description:
      'Structural-grade fabrication for warehouses, sheds and industrial projects built to standards.',
    features: ['Engineered', 'Heavy-duty', 'Custom specs', 'Compliance ready'],
    image: '/projects/main-gates/laser-cut-steel-main-gate.webp',
  },
  {
    id: 'custom-fab',
    title: 'Custom Metal Fabrication',
    category: 'Custom',
    description:
      'Bespoke metalwork from concept to finished product — furniture, fixtures and specialty parts.',
    features: ['Design consult', 'Precision', 'Multiple metals', 'QA'],
    image: '/projects/main-doors/ss-designer-main-door.webp',
  },
  {
    id: 'welding',
    title: 'Onsite Welding & Repairs',
    category: 'Service',
    description:
      'Fast, high-quality onsite welding and structural repairs with emergency support options.',
    features: ['Emergency', 'All weld types', 'Structural repair', 'Maintenance plans'],
    image: '/projects/collapsible-gates/collapsible-steel-gate.webp',
  },
];

function QuickQuoteModal({ open, service, onClose }) {
  const nameRef = useRef(null);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // {type, message}

  useEffect(() => {
    if (open) {
      setTimeout(() => nameRef.current?.focus?.(), 60);
      setErrors({});
      setStatus(null);
      setForm({ name: '', contact: '', message: '', website: '' });
    }
  }, [open, service]);

  if (!open) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please provide your name';
    if (!form.contact.trim()) e.contact = 'Provide phone or email';
    if (!form.message.trim()) e.message = 'Please briefly describe the project';
    if (form.website && form.website.trim().length > 0) e.website = 'Spam detected';
    return e;
  };

  const handleChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setStatus(null);

    try {
      const payload = {
        name: form.name,
        email: form.contact.includes('@') ? form.contact : '',
        phone: !form.contact.includes('@') ? form.contact : '',
        service: service ? service.title : 'General Quote',
        message: `${form.message}\n\n-- Quick quote requested for service: ${service ? service.title : 'General'}`,
        website: form.website,
      };

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to send request');

      setStatus({ type: 'success', message: json?.message || 'Request sent — we will contact you soon.' });
      setForm({ name: '', contact: '', message: '', website: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message || 'Unable to send request. Try again or call.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Quick quote" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <header className="flex items-start justify-between p-5 border-b">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{service ? `Get Quote — ${service.title}` : 'Request a Quote'}</h3>
            <p className="text-sm text-slate-600 mt-1">Free site visit and detailed estimate — no obligations.</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="text-slate-500 hover:text-slate-800">✕</button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 grid gap-4">
          <label className="text-sm">
            Your name
            <input
              ref={nameRef}
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g., Rahul Sharma"
            />
            {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
          </label>

          <label className="text-sm">
            Phone or Email
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="+91 9xxxxxxxxx or name@domain.com"
            />
            {errors.contact && <p className="text-xs text-rose-600 mt-1">{errors.contact}</p>}
          </label>

          <label className="text-sm">
            Brief project details
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-200"
              placeholder="Short details, site, approximate size..."
            />
            {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
          </label>

          {/* honeypot - hidden */}
          <input name="website" value={form.website} onChange={handleChange} className="hidden" tabIndex="-1" autoComplete="off" />

          {status && (
            <div
              role="status"
              className={`rounded-md p-3 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
            >
              {status.message}
            </div>
          )}

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-linear-to-br from-blue-600 to-sky-600 text-white"
            >
              {submitting ? 'Sending...' : 'Request Quote'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Service card component */
function ServiceCard({ service, onQuickQuote }) {
  return (
    <article aria-labelledby={`card-${service.id}-title`} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transform transition hover:-translate-y-1 overflow-hidden grid md:grid-cols-3">
      <div className="relative h-56 md:h-auto md:col-span-1">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/_next/image/placeholder.png"
        />
        <div className="absolute left-4 top-4 bg-white/90 text-xs px-3 py-1 rounded-full font-semibold shadow">
          <span className="text-slate-700">{service.category}</span>
        </div>
      </div>

      <div className="p-6 md:col-span-2 flex flex-col">
        <h4 id={`card-${service.id}-title`} className="text-2xl font-extrabold mb-2 text-slate-900">{service.title}</h4>
        <p className="text-sm text-slate-600 mb-4">{service.description}</p>

        <ul className="flex flex-wrap gap-2 mb-4">
          {service.features.map((f, i) => (
            <li key={i} className="text-xs bg-slate-50 px-2 py-1 rounded-md border text-slate-700">{f}</li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3">
          <a href={`/projects#${service.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
            View Related Projects <FaChevronRight />
          </a>

          <button onClick={() => onQuickQuote(service)} className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-linear-to-br from-blue-600 to-sky-600 text-white rounded-md text-sm">
            Quick Quote
          </button>
        </div>
      </div>
    </article>
  );
}

/* Process timeline (kept simple) */
function ProcessTimeline() {
  const steps = [
    { title: 'Consultation', desc: 'Understand requirements, site constraints and desired finishes.' },
    { title: 'Measurement & Quotation', desc: 'Free on-site measurements and a detailed written estimate.' },
    { title: 'Design & Approval', desc: 'CAD drawings and finish options for client approval.' },
    { title: 'Fabrication', desc: 'Precision fabrication in our facility with quality checks.' },
    { title: 'Installation', desc: 'Onsite installation by experienced teams with safety controls.' },
    { title: 'Aftercare', desc: 'Maintenance contracts and warranty services.' },
  ];

  return (
    <section aria-labelledby="process-heading" className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 id="process-heading" className="text-2xl font-bold mb-4">Our Process</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-4 items-start p-4 rounded-lg bg-slate-50 border">
            <div className="min-w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">{i + 1}</div>
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-slate-600 mt-1">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Services() {
  const id = useId();
  const [category, setCategory] = useState('All');
  const [activeService, setActiveService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const categories = ['All', ...Array.from(new Set(SERVICES.map((s) => s.category)))];
  const filtered = SERVICES.filter((s) => (category === 'All' ? true : s.category === category));

  function openQuote(svc) {
    setActiveService(svc);
    setModalOpen(true);
  }
  function closeQuote() {
    setActiveService(null);
    setModalOpen(false);
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="bg-linear-to-r from-white to-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 mb-4">
                Trusted Fabrication Since 2009
              </p>
              <h1 id={`services-hero-${id}`} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                Precision Steel Fabrication — Built to Last
              </h1>
              <p className="mt-6 text-lg text-slate-600 max-w-2xl">
                Residential, commercial and industrial metalworks — engineered, finished and installed with unmatched attention to detail.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 items-center">
                <a href="/contact" className="inline-flex items-center gap-3 rounded-md bg-blue-600 px-6 py-3 text-md font-semibold text-white shadow-lg hover:bg-blue-700 transition">
                  Get Free Consultation
                </a>

                <button onClick={() => openQuote(null)} className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-md font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 transition">
                  Request Quote
                </button>

                <a href="tel:+919665181246" className="ml-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                  <FaPhoneAlt /> +91 96651 81246
                </a>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 md:h-96">
              <Image
                src="/projects/railings/ss-balcony-railing-curved-design.webp"
                alt="Fabrication workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="/_next/image/placeholder.png"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container mx-auto px-4 mt-8">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${category === c ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-700 border border-slate-200'}`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto text-sm text-slate-500">
            Showing <strong className="text-slate-900">{filtered.length}</strong> {filtered.length === 1 ? 'service' : 'services'}
          </div>
        </div>
      </section> */}

      <section className="container mx-auto px-4 mt-8 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} onQuickQuote={openQuote} />
          ))}
        </div>

        <div className="mt-12">
          <ProcessTimeline />
        </div>

        <aside className="mt-12 bg-linear-to-r from-blue-600 to-sky-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-2xl font-extrabold">Start your project with confidence</h4>
            <p className="mt-1 text-sm opacity-90">Free site visit, detailed estimate and timelines — we handle end-to-end delivery.</p>
          </div>

          <div className="flex items-center gap-3">
            <a href="/contact" className="px-5 py-3 rounded-md bg-white text-blue-600 font-semibold">Schedule Site Visit</a>
            <a href="tel:+919665181246" className="px-5 py-3 rounded-md border border-white/30">Call: +91 96651 81246</a>
          </div>
        </aside>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <div className="text-3xl font-extrabold">15+</div>
            <div className="text-sm text-slate-600 mt-1">Years Experience</div>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <div className="text-3xl font-extrabold">500+</div>
            <div className="text-sm text-slate-600 mt-1">Projects Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg text-center shadow-sm">
            <div className="text-3xl font-extrabold">100%</div>
            <div className="text-sm text-slate-600 mt-1">Client Satisfaction</div>
          </div>
        </div>
      </section>

      <QuickQuoteModal open={modalOpen} service={activeService} onClose={closeQuote} />
    </main>
  );
}