'use client';

import { useId, useRef, useState, useEffect } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaWhatsapp,
  FaTools,
} from 'react-icons/fa';

export default function Contact() {
  const id = useId();
  const firstFieldRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { type: 'success' | 'error', message: string }

  const services = [
    'Steel Railings',
    'Security Doors & Gates',
    'Window & Balcony Grills',
    'Kitchen Trolleys & Counters',
    'Industrial Structures',
    'Custom Fabrication',
    'Onsite Welding & Repairs',
  ];

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) e.name = 'Please enter your full name';
    if (!data.phone.trim()) {
      e.phone = 'Please enter your phone number';
    } else if (!/^[+\d\s()-]{6,20}$/.test(data.phone.trim())) {
      e.phone = 'Please enter a valid phone number';
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      e.email = 'Please enter a valid email address';
    }
    if (!data.service) e.service = 'Please select a service';
    if (!data.message.trim()) e.message = 'Please describe your project';
    // honeypot should be empty
    if (data.website && data.website.trim().length > 0) e.website = 'Spam detected';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setResult(null);

    const validation = validate(formData);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstErr = Object.keys(validation)[0];
      const el = document.querySelector(`[name="${firstErr}"]`);
      el?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          website: formData.website,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || 'Failed to send message');
      }

      setResult({ type: 'success', message: json?.message || 'Message sent successfully.' });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        website: '',
      });

      // move focus to result for screen reader users
      const alert = document.getElementById(`contact-result-${id}`);
      alert?.focus();
    } catch (err) {
      console.error(err);
      setResult({
        type: 'error',
        message: err?.message || 'There was an error sending your message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby={`contact-heading-${id}`}
      className="bg-white py-16 sm:py-20"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            id={`contact-heading-${id}`}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
          >
            Get In Touch
          </h2>
          <div className="mt-3 mx-auto h-1 w-24 bg-gradient-to-r from-blue-600 to-sky-600 rounded" />
          <p className="mt-4 text-slate-600">
            Contact us for professional steel fabrication solutions. Free
            consultations and quotes for projects in Mumbai & Thane.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Contact Information
              </h3>

              <ul className="space-y-4 text-slate-700">
                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaPhone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Phone
                    </div>
                    <div className="text-sm">+91 96651 81246</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-emerald-600">
                    <FaWhatsapp className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      WhatsApp
                    </div>
                    <div className="text-sm">+91 96651 81246 (Quick replies)</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaEnvelope className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Email
                    </div>
                    <div className="text-sm">rnallsteelfabrication@gmail.com</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaMapMarkerAlt className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Service Area
                    </div>
                    <div className="text-sm">Mumbai & Thane — Free site visits</div>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaClock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      Working Hours
                    </div>
                    <div className="text-sm">Mon–Sat: 9:00 AM – 7:00 PM</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-600 p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-white/20 p-3">
                  <FaTools className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Emergency Services</div>
                  <div className="text-sm opacity-90">
                    24/7 welding & repair — on-site support
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="tel:+919665181246"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                >
                  <FaPhone className="h-4 w-4" />
                  +91 96651 81246
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column - Form */}
          <main className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Get Free Quote
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Fill the form and we will contact you within 24 hours.
                  </p>
                </div>
                <div className="hidden sm:block text-sm text-slate-500">
                  Or call us: <a className="font-semibold text-slate-700" href="tel:+919665181246">+91 96651 81246</a>
                </div>
              </div>

              {/* Result Message */}
              {result && (
                <div
                  id={`contact-result-${id}`}
                  tabIndex={-1}
                  role="status"
                  aria-live="polite"
                  className={`mt-6 rounded-md p-3 text-sm ${
                    result.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100'
                      : 'bg-rose-50 text-rose-800 ring-1 ring-rose-100'
                  }`}
                >
                  {result.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-6" noValidate>
                {/* honeypot field (hidden from users) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  autoComplete="off"
                  tabIndex={-1}
                  className="hidden"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`name-${id}`} className="block text-sm font-medium text-slate-700">
                      Full Name *
                    </label>
                    <input
                      ref={firstFieldRef}
                      id={`name-${id}`}
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `error-name-${id}` : undefined}
                      className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                        errors.name
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p id={`error-name-${id}`} className="mt-1 text-xs text-rose-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`phone-${id}`} className="block text-sm font-medium text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      id={`phone-${id}`}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `error-phone-${id}` : undefined}
                      className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p id={`error-phone-${id}`} className="mt-1 text-xs text-rose-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`email-${id}`} className="block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <input
                      id={`email-${id}`}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `error-email-${id}` : undefined}
                      className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p id={`error-email-${id}`} className="mt-1 text-xs text-rose-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor={`service-${id}`} className="block text-sm font-medium text-slate-700">
                      Service Required *
                    </label>
                    <select
                      id={`service-${id}`}
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? `error-service-${id}` : undefined}
                      className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                        errors.service
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-200 focus:ring-blue-200'
                      }`}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id={`error-service-${id}`} className="mt-1 text-xs text-rose-600">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor={`message-${id}`} className="block text-sm font-medium text-slate-700">
                    Project Details *
                  </label>
                  <textarea
                    id={`message-${id}`}
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `error-message-${id}` : undefined}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                      errors.message
                        ? 'border-rose-400 focus:ring-rose-200'
                        : 'border-slate-200 focus:ring-blue-200'
                    }`}
                    placeholder="Describe your project, approximate dimensions, location, and any important details..."
                  />
                  {errors.message && (
                    <p id={`error-message-${id}`} className="mt-1 text-xs text-rose-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow hover:from-blue-700 hover:to-sky-700 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          aria-hidden
                          className="mr-3 h-4 w-4 animate-spin text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" className="opacity-75" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message & Get Free Quote'
                    )}
                  </button>

                  <a
                    href="tel:+919665181246"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <FaPhone className="h-4 w-4" /> Call Now
                  </a>

                  <a
                    href="https://wa.me/+919665181246"
                    className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
                  >
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp
                  </a>
                </div>

                <p className="text-center text-xs text-slate-500">
                  We respect your privacy — your details will never be shared.
                </p>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}