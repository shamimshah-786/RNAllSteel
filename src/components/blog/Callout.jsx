"use cient" 
// src/components/blog/Callout.jsx
// ⚠️ Must be in its own file — inline server component functions
//    inside MDXRemote's components map cause "got: object" build errors

export default function Callout({ type = 'info', icon, children }) {
  const styles = {
    info: { wrap: 'bg-blue-50 border-blue-200 text-blue-900',          icon: 'ℹ️' },
    tip:  { wrap: 'bg-emerald-50 border-emerald-200 text-emerald-900', icon: '💡' },
    warn: { wrap: 'bg-amber-50 border-amber-200 text-amber-900',       icon: '⚠️' },
    error:{ wrap: 'bg-red-50 border-red-200 text-red-900',             icon: '❌' },
  };
  const s = styles[type] ?? styles.info;

  return (
    <div
      role="note"
      className={`callout ${s.wrap} border rounded-xl p-4 my-6 flex gap-3
        text-sm leading-relaxed not-prose`}
    >
      <span className="text-base flex-shrink-0 mt-0.5" aria-hidden="true">
        {icon ?? s.icon}
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}