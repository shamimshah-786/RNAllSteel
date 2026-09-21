'use client';

import { useId, useRef, useState } from 'react';
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhone,
  FaTimesCircle,
  FaWhatsapp,
} from 'react-icons/fa';

/* Shared input styling — sharp edges to match the rest of the site. */
const baseInput = `w-full rounded-[2px] border bg-white px-4 py-3 text-[14px]
  text-slate-900 placeholder-slate-400 transition-colors duration-150
  focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600
  disabled:opacity-50`;
const errInput = 'border-red-400 bg-red-50/60';
const okInput = 'border-gray-300 hover:border-slate-400';

function Field({ label, required, error, errorId, children }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase
        tracking-[0.14em] text-slate-500">
        {label}
        {required && <span className="ml-1 text-blue-600">*</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-[12px] text-red-600">
          <FaTimesCircle className="shrink-0 text-[10px]" />
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * `services` is passed in from the server page so the full services
 * dataset never reaches the client bundle.
 */
export default function ContactForm({ services = [] }) {
  const id = useId();
  const resultRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '', website: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const validate = (d) => {
    const e = {};
    if (!d.name.trim()) e.name = 'Please enter your full name';
    if (!d.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[+\d\s()-]{6,20}$/.test(d.phone.trim()))
      e.phone = 'Enter a valid phone number';
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim()))
      e.email = 'Enter a valid email address';
    if (!d.service) e.service = 'Please select a service';
    if (!d.message.trim()) e.message = 'Please describe your project';
    if (d.website?.trim()) e.website = 'Spam detected';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((s) => ({ ...s, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      document.querySelector(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Failed to send message');
      setResult({
        ok: true,
        msg: json?.message || 'Message sent — we will contact you shortly.',
      });
      setForm({ name: '', email: '', phone: '', service: '', message: '', website: '' });
      setTimeout(() => resultRef.current?.focus(), 60);
    } catch (err) {
      setResult({
        ok: false,
        msg: err.message || 'Unable to send. Please call or WhatsApp us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-7 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em]
              text-blue-600">
              Free quote
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]
              text-slate-900">
              Describe your project
            </h2>
            <p className="mt-2 text-[14px] text-slate-500">
              We reply within 24 hours. No obligation.
            </p>
          </div>
          <div className="hidden shrink-0 text-right sm:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]
              text-slate-400">
              Prefer to call?
            </p>
            <a
              href="tel:+919665181246"
              className="mt-1.5 inline-flex items-center gap-2 text-[14px]
                font-semibold text-slate-900 transition-colors duration-150
                hover:text-blue-700"
            >
              <FaPhone className="text-[11px] text-blue-600" />
              +91 96651 81246
            </a>
          </div>
        </div>
      </div>

      {/* Result banner */}
      {result && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`mx-6 mt-6 flex items-start gap-3 rounded-[2px] border p-4
            text-[14px] sm:mx-8
            ${result.ok
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'}`}
        >
          {result.ok ? (
            <FaCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />
          ) : (
            <FaTimesCircle className="mt-0.5 shrink-0 text-red-500" />
          )}
          <p>{result.msg}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6 px-6 py-8 sm:px-8">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Full name" required error={errors.name} errorId={`err-name-${id}`}>
            <input
              id={`name-${id}`}
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `err-name-${id}` : undefined}
              placeholder="e.g. Rahul Sharma"
              className={`${baseInput} ${errors.name ? errInput : okInput}`}
            />
          </Field>

          <Field label="Phone number" required error={errors.phone} errorId={`err-phone-${id}`}>
            <input
              id={`phone-${id}`}
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? `err-phone-${id}` : undefined}
              placeholder="+91 98765 43210"
              className={`${baseInput} ${errors.phone ? errInput : okInput}`}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Email address" error={errors.email} errorId={`err-email-${id}`}>
            <input
              id={`email-${id}`}
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `err-email-${id}` : undefined}
              placeholder="you@example.com"
              className={`${baseInput} ${errors.email ? errInput : okInput}`}
            />
          </Field>

          <Field label="Service required" required error={errors.service} errorId={`err-service-${id}`}>
            <select
              id={`service-${id}`}
              name="service"
              value={form.service}
              onChange={handleChange}
              disabled={submitting}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? `err-service-${id}` : undefined}
              className={`${baseInput} cursor-pointer ${errors.service ? errInput : okInput}`}
            >
              <option value="">Select a service</option>
              {services.map((group) => (
                <optgroup key={group.category} label={group.category}>
                  {group.items.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </optgroup>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </Field>
        </div>

        <Field label="Project details" required error={errors.message} errorId={`err-message-${id}`}>
          <textarea
            id={`message-${id}`}
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            disabled={submitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `err-message-${id}` : undefined}
            placeholder="Opening size, location, material preference, timeline — whatever you know so far."
            className={`${baseInput} resize-none ${errors.message ? errInput : okInput}`}
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex flex-1 items-center justify-center gap-3
              rounded-[2px] bg-blue-600 px-7 py-4 text-[12px] font-semibold
              uppercase tracking-[0.14em] text-white transition-colors duration-200
              hover:bg-blue-700 disabled:opacity-60 sm:flex-none"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2
                  border-white/30 border-t-white" />
                Sending…
              </>
            ) : (
              <>
                Send &amp; Get Free Quote
                <FaArrowRight className="text-[10px]" />
              </>
            )}
          </button>

          <a
            href="tel:+919665181246"
            className="inline-flex items-center justify-center gap-2.5 rounded-[2px]
              border border-gray-300 px-6 py-4 text-[12px] font-semibold uppercase
              tracking-[0.14em] text-slate-700 transition-colors duration-200
              hover:border-slate-900"
          >
            <FaPhone className="text-[11px] text-blue-600" />
            Call
          </a>

          <a
            href="https://wa.me/919665181246"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-[2px]
              border border-gray-300 px-6 py-4 text-[12px] font-semibold uppercase
              tracking-[0.14em] text-slate-700 transition-colors duration-200
              hover:border-emerald-500 hover:text-emerald-700"
          >
            <FaWhatsapp className="text-base text-emerald-500" />
            WhatsApp
          </a>
        </div>

        <p className="border-t border-gray-200 pt-5 text-[12px] text-slate-400">
          Your details are used only to prepare your quotation — never shared with
          anyone else.
        </p>
      </form>
    </div>
  );
}
