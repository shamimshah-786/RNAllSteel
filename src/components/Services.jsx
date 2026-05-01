import Link from "next/link";
import {
  FaRulerCombined,
  FaDoorClosed,
  FaShieldAlt,
  FaUtensils,
  FaIndustry,
  FaTools,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

const services = [
  {
    name: "Steel Railings",
    tagline: "Staircases, balconies & terraces",
    description:
      "Custom-designed railings crafted for durability and aesthetics — from sleek SS to modern glass-filled frames.",
    icon: FaRulerCombined,
    image: "/projects/railings/stainless-steel-staircase-railing.webp",
    features: ["Custom Designs", "Durable Finish", "Easy Installation"],
    accent: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Security Doors & Gates",
    tagline: "Main gates, compound & entry doors",
    description:
      "Heavy-duty security solutions with weather-resistant finishes — designed for both strength and curb appeal.",
    icon: FaDoorClosed,
    image: "/projects/main-doors/ss-designer-main-door.webp",
    features: ["High Security", "Weather Resistant", "Custom Sizes"],
    accent: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    name: "Window & Balcony Grills",
    tagline: "Aesthetic security for every opening",
    description:
      "Decorative yet secure grills in a range of patterns — modern, traditional, or fully custom to match your home.",
    icon: FaShieldAlt,
    image: "/projects/window-grills/stainless-steel-window-grill-modern.webp",
    features: ["Aesthetic Designs", "Enhanced Security", "Multiple Patterns"],
    accent: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Kitchen Trolleys & Counters",
    tagline: "SS kitchen furniture & storage",
    description:
      "Hygienic stainless steel trolleys, counters, and shelving built for modern residential and commercial kitchens.",
    icon: FaUtensils,
    image: "/projects/street-stalls/stainless-steel-food-cart-stall.webp",
    features: ["Stainless Steel", "Hygienic", "Space Saving"],
    accent: "bg-slate-50 text-slate-700 border-slate-200",
  },
  {
    name: "Industrial Structures",
    tagline: "Sheds, frames & support systems",
    description:
      "Commercial-grade fabrication for industrial sheds, mezzanine floors, and structural steel frameworks.",
    icon: FaIndustry,
    image: "/images/banner.jpg",
    features: ["Heavy Duty", "Commercial Grade", "Custom Engineering"],
    accent: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Custom Fabrication",
    tagline: "Any shape. Any size. Any material.",
    description:
      "Bespoke metalwork for one-of-a-kind requirements — from architectural accents to specialised structural pieces.",
    icon: FaTools,
    image: "/images/custom-door.jpg",
    features: ["Bespoke Designs", "Precision Work", "Tailored Solutions"],
    accent: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

export default function Services() {
  return (
    <section className="bg-slate-50 overflow-hidden">

      {/* ── HEADER BAND ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Left */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <span className="w-6 h-px bg-blue-600" />
                What We Build
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Steel Fabrication{" "}
                <span className="text-blue-600">Services</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                From a single window grill to a full industrial structure — every
                job gets the same precision, quality materials, and on-time delivery.
              </p>
            </div>
            {/* Right — CTA */}
            <div className="flex-shrink-0">
              <a
                href="https://wa.me/919665181246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <FaWhatsapp className="text-base" />
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── SERVICES GRID ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">

        {/* Featured first two — large horizontal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {services.slice(0, 2).map((s, i) => (
            <Link
              href="/services"
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="relative w-full sm:w-48 lg:w-56 flex-shrink-0 h-52 sm:h-auto overflow-hidden">
                <img
                  src={s.image}
                  alt={s.name}
                  width={224}
                  height={240}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
              </div>
              {/* Content */}
              <div className="flex flex-col justify-between p-6 flex-1">
                <div>
                  {/* Icon + Name */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow group-hover:bg-blue-700 transition-colors duration-200">
                      <s.icon className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors duration-200">
                        {s.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                </div>
                {/* Tags + Arrow */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${s.accent}`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <FaArrowRight className="text-blue-600 text-xs group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 ml-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining four — compact vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(2).map((s, i) => (
            <Link
              href="/services"
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img
                  src={s.image}
                  alt={s.name}
                  width={400}
                  height={176}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Icon over image */}
                <div className="absolute bottom-3 left-3 w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow group-hover:bg-blue-700 transition-colors duration-200">
                  <s.icon className="text-white text-xs" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <p className="font-bold text-gray-900 text-base mb-0.5 group-hover:text-blue-600 transition-colors duration-200">
                  {s.name}
                </p>
                <p className="text-xs text-gray-400 mb-3">{s.tagline}</p>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                  {s.description}
                </p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="text-xs font-semibold text-blue-600">
                    View Details
                  </span>
                  <FaArrowRight className="text-blue-600 text-xs group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <div className="mt-10 bg-slate-900 rounded-2xl p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="text-white font-bold text-xl sm:text-2xl mb-1">
              Don't see what you need?
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              We do custom work too — just describe your requirement and we'll get back within 24 hrs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
              href="tel:+919665181246"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-md"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/919665181246"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-200"
            >
              <FaWhatsapp className="text-green-400" />
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}