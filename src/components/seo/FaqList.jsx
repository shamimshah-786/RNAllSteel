/** Visible FAQ block. Uses <details> so answers are in the HTML for
 *  crawlers even when collapsed, with no client JavaScript. */
export default function FaqList({ faqs, heading = 'Common questions' }) {
  if (!faqs?.length) return null;

  return (
    <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold
              uppercase tracking-[0.24em] text-blue-600">
              <span className="h-px w-8 bg-blue-600" />
              FAQ
            </p>
            <h2 className="mt-6 text-2xl font-semibold leading-tight
              tracking-[-0.02em] text-slate-900 sm:text-3xl">
              {heading}
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
              Something not covered here? Call us on{' '}
              <a
                href="tel:+919665181246"
                className="font-semibold text-blue-700 underline underline-offset-4"
              >
                +91 96651 81246
              </a>{' '}
              — we would rather answer it before you order than after.
            </p>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-gray-200">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-gray-200 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-start justify-between
                    gap-6 py-5 text-[15px] font-semibold text-slate-900
                    transition-colors duration-150 hover:text-blue-700">
                    <dt>{f.q}</dt>
                    <span
                      aria-hidden
                      className="relative mt-2 h-3 w-3 shrink-0"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2
                        bg-blue-600" />
                      <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2
                        bg-blue-600 transition-transform duration-200
                        group-open:scale-y-0" />
                    </span>
                  </summary>
                  <dd className="-mt-1 pb-5 pr-9 text-[14.5px] leading-relaxed
                    text-slate-600">
                    {f.a}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
