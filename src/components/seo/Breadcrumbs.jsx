import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

/** Visible breadcrumb trail. The matching BreadcrumbList schema is
 *  emitted by the page itself via breadcrumbSchema(). */
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]
        font-medium uppercase tracking-[0.12em] text-slate-400">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-slate-700">{item.name}</span>
              ) : (
                <>
                  <Link
                    href={item.path}
                    className="transition-colors duration-150 hover:text-blue-600"
                  >
                    {item.name}
                  </Link>
                  <FaChevronRight className="text-[7px] text-slate-300" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
