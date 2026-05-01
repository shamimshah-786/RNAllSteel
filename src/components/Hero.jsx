import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaArrowRight,
  FaCheckCircle,
  FaShieldAlt,
  FaStar,
  FaTools,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-slate-50 overflow-hidden">
      {/* Subtle grid background — no purple blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-7 lg:space-y-9">
            {/* Location Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm">
              <FaMapMarkerAlt className="text-blue-500 text-xs" />
              Serving Mumbai &amp; Thane Since 2010
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-gray-900">
                Premium{" "}
                <span className="text-blue-600">Steel Fabrication</span>{" "}
                Services
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl font-normal">
                Expert steel solutions for{" "}
                <strong className="font-semibold text-gray-800">
                  residential, commercial &amp; industrial
                </strong>{" "}
                projects — delivered with precision and pride.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {["ISO Certified", "15+ Years Exp", "500+ Projects", "Free Site Visit"].map(
                (item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                  >
                    <FaCheckCircle className="text-green-500 text-xs" />
                    {item}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Free Quote
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 border-2 border-blue-600 text-blue-700 hover:text-blue-800 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-sm"
              >
                Our Services
                <FaTools className="text-xs" />
              </Link>
            </div>

            {/* Contact Row — Desktop */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="tel:+919665181246"
                className="flex items-center gap-3 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 px-4 py-2.5 rounded-xl shadow-sm transition-colors duration-200 group"
              >
                <div className="w-9 h-9 bg-blue-600 group-hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <FaPhone className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                    Call Direct
                  </p>
                  <p className="font-bold text-sm text-gray-900">+91 96651 81246</p>
                </div>
              </a>

              <a
                href="https://wa.me/919665181246"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-gray-200 hover:border-green-400 hover:bg-green-50 px-4 py-2.5 rounded-xl shadow-sm transition-colors duration-200 group"
              >
                <div className="w-9 h-9 bg-green-500 group-hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <FaWhatsapp className="text-white text-sm" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <p className="font-bold text-sm text-gray-900">Instant Quote</p>
                </div>
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Image Grid ── */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Main Image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl h-56 sm:h-72 lg:h-80 group">
                <img
                  src="/images/banner.jpg"
                  alt="RN All Steel Fabrication — Industrial Steel Work"
                  width={800}
                  height={480}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-6">
                  <p className="text-white font-bold text-base sm:text-xl">
                    Industrial Steel Fabrication
                  </p>
                  <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
                    Precision Engineering &amp; Quality Craftsmanship
                  </p>
                </div>
                {/* Quality badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 text-center shadow-md">
                  <div className="flex items-center gap-1 justify-center mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-xs" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-gray-900">5.0 Rating</p>
                  <p className="text-[10px] text-gray-500">41 Reviews</p>
                </div>
              </div>

              {/* Sub Image 1 */}
              <div className="relative rounded-xl overflow-hidden shadow-lg h-32 sm:h-44 lg:h-52 group">
                <img
                  src="/images/glass.jpg"
                  alt="Premium Glass Railings Mumbai"
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2 sm:p-3">
                  <p className="text-white font-semibold text-xs sm:text-sm">Glass Railings</p>
                  <p className="text-blue-200 text-[10px]">Modern &amp; Elegant</p>
                </div>
              </div>

              {/* Sub Image 2 */}
              <div className="relative rounded-xl overflow-hidden shadow-lg h-32 sm:h-44 lg:h-52 group">
                <img
                  src="/images/staircase-railing.jpg"
                  alt="Staircase Steel Railings Thane"
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-2 sm:p-3">
                  <p className="text-white font-semibold text-xs sm:text-sm">Staircase Railings</p>
                  <p className="text-blue-200 text-[10px]">Custom Designs</p>
                </div>
              </div>
            </div>

            {/* Shield Badge */}
            <div className="absolute -top-4 -right-3 sm:-top-5 sm:-right-5 bg-white border border-blue-100 shadow-lg rounded-2xl p-3 sm:p-4 text-center z-10">
              <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto mb-1.5 bg-blue-600 rounded-xl flex items-center justify-center shadow">
                <FaShieldAlt className="text-white text-sm sm:text-lg" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-900">Quality</p>
              <p className="text-[10px] text-gray-500 font-medium">Certified</p>
            </div>

            {/* Mobile Contact Strip */}
            <div className="flex sm:hidden items-center mt-5 gap-2 bg-white border border-gray-200 rounded-xl p-2 shadow-md">
              <a
                href="tel:+919665181246"
                className="flex items-center gap-2 flex-1"
              >
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-white text-xs" />
                </div>
                <div>
                  <p className="text-[9px] font-semibold text-blue-600 uppercase tracking-wider">
                    Call Now
                  </p>
                  <p className="font-bold text-xs text-gray-900">+91 96651 81246</p>
                </div>
              </a>
              <div className="w-px h-8 bg-gray-200" />
              <a
                href="https://wa.me/919665181246"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center flex-1"
              >
                <div className="w-9 h-9 border-2 border-green-500 rounded-xl flex items-center justify-center">
                  <FaWhatsapp className="text-green-500 text-lg" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}