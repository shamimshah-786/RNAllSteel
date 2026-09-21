import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { BUSINESS } from '@/lib/seo';

export default function CtaBand({
  title = 'Ready to start?',
  subtitle = 'Free site visit and measurement. Itemised quotation within 24 hours.',
}) {
  return (
    <section className="bg-slate-950 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8
          lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em]
              text-blue-400">
              Talk to us
            </p>
            <h2 className="mt-5 text-2xl font-semibold leading-tight
              tracking-[-0.02em] text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
              {subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-[2px]
                bg-blue-600 px-7 py-4 text-[12px] font-semibold uppercase
                tracking-[0.14em] text-white transition-colors duration-200
                hover:bg-blue-700"
            >
              <FaWhatsapp className="text-sm" />
              WhatsApp Us
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-[2px]
                border border-white/20 px-7 py-4 text-[12px] font-semibold uppercase
                tracking-[0.14em] text-white transition-colors duration-200
                hover:border-white/50"
            >
              <FaPhone className="text-[11px]" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3
          border-t border-white/10 pt-8 text-[12px] text-slate-400">
          <span>Open daily · 9:30 AM – 9:15 PM</span>
          <span>Workshop: Mumbra, Thane 400612</span>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-semibold text-white
              transition-colors duration-150 hover:text-blue-400"
          >
            Send an enquiry
            <FaArrowRight className="text-[10px] transition-transform duration-150
              group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
