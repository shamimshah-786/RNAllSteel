import Link from "next/link";
import {
  FaHardHat,
  FaShieldAlt,
  FaAward,
  FaMapMarkerAlt,
  FaTools,
  FaIndustry,
  FaStar,
  FaPhone,
  FaWhatsapp,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
{/* Premium Background with Gradient Mesh */}
<div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50/20 to-white">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
  <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
</div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rounded-full blur-sm"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-blue-600/10 rounded-full blur-sm"></div>
      <div className="absolute bottom-32 left-20 w-8 h-8 bg-slate-400/10 rounded-full blur-sm"></div>

      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-center">
          {/* Left Content - Enhanced Text Section */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-10">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-700 px-3 py-2 rounded-xl shadow-lg">
              <div className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-blue-600 text-xs" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Serving Mumbai Since 2010
                </span>
              </div>
            </div>

            {/* Main Heading with Enhanced Typography */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Premium </span>
                <span className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Steel Fabrication
                </span>
                <span className="text-gray-800"> Services</span>
              </h1>

             {/* Enhanced Subtitle */}
              <p className="text-md sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Expert steel fabrication solutions for 
                <span className="font-semibold text-gray-700">
                  {" "}
                  residential, commercial, and industrial{" "} 
                </span>
                projects. Delivering excellence across Mumbai and Thane.
              </p>
            </div>

            {/* Trust Indicators - Improved Mobile Layout */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start items-center">
              {[
                "ISO Certified",
                "15+ Years Exp",
                "500+ Projects",
                "24/7 Support",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-gray-600 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md border border-gray-100"
                >
                  <FaCheckCircle className="text-green-500 text-xs" />
                  <span className="font-medium whitespace-nowrap">{item}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons - Improved Mobile Layout */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="group relative bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-lg font-semibold text-center transition-all duration-500 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="text-sm relative z-10">
                  GET FREE QUOTE
                </span>
                <FaArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </Link>

              <Link
                href="/services"
                className="group bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 px-5 py-3 rounded-lg font-semibold text-center transition-all duration-500 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="text-sm">OUR SERVICES</span>
                <FaTools className="w-3 h-3 transform group-hover:rotate-12 transition-transform duration-300" />
              </Link>
            </div>

            {/* Desktop Contact Buttons - Hidden on Mobile */}
            <div className="hidden sm:flex items-center gap-3 justify-center lg:justify-start pt-3">
              <a
                href="tel:+919665181246"
                className="group flex items-center gap-2 bg-linear-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 border border-blue-200/80 hover:border-blue-300 text-blue-700 hover:text-blue-800 px-4 py-2 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-md flex-shrink-0">
                    <FaPhone className="text-white text-sm" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-blue-600/80 font-semibold uppercase tracking-wider">
                    Call Direct
                  </p>
                  <span className="font-bold text-sm text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                    +91 96651 81246 
                  </span>
                </div>
              </a>

              <a
                href="https://wa.me/+919665181246"
                className="group flex items-center gap-2 bg-linear-to-r from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200 border border-green-200/80 hover:border-green-300 text-green-700 hover:text-green-800 px-4 py-2 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300 shadow-md flex-shrink-0">
                    <FaWhatsapp className="text-white text-sm" />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-green-600/80 font-semibold uppercase tracking-wider">
                    WhatsApp
                  </p>
                  <span className="font-bold text-sm text-gray-900 group-hover:text-green-900 transition-colors duration-300">
                    Instant Quote
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Premium Image Showcase */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* Main Featured Image */}
                <div className="col-span-2">
                  <div className="relative h-56 sm:h-72 lg:h-96 bg-linear-to-br from-blue-100/50 to-gray-100/50 rounded-xl sm:rounded-3xl overflow-hidden shadow-xl group">
                    <img
                      src="/images/banner.jpg"
                      alt="Industrial Steel Fabrication"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-linear-to-t from-transparent via-black/30 to-black/80 z-20"></div>
                    <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 lg:p-8 z-30">
                      {/* <div className="flex items-center gap-2 mb-1 sm:mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-300 text-xs font-semibold">
                          Available Now
                        </span>
                      </div> */}
                      <h3 className="text-white font-bold text-base sm:text-xl lg:text-3xl mb-1 sm:mb-3">
                        Industrial Steel Fabrication
                      </h3>
                      <p className="text-blue-200 text-xs sm:text-lg font-light">
                        Precision Engineering & Quality Craftsmanship
                      </p>
                    </div>
                  </div>
                </div>

                {/* Secondary Project Images */}
                <div className="relative group">
                  <div className="relative h-32 sm:h-48 lg:h-56 bg-linear-to-br from-gray-50 to-blue-50 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <img
                      src="/images/glass.jpg"
                      alt="Premium Steel Glass Railings"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                      <p className="text-white font-semibold text-sm">Premium Glass Railings</p>
                      <p className="text-blue-200 text-xs">Modern Glass Balcony Railings</p>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="relative h-32 sm:h-48 lg:h-56 bg-linear-to-br from-gray-50 to-blue-50 rounded-lg sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <img
                      src="/images/staircase-railing.jpg"
                      alt="Staircase Railings"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                      <p className="text-white font-semibold text-sm">Staircase Railings</p>
                      <p className="text-blue-200 text-xs">Railings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Contact Buttons - Below Images */}
              <div className="flex sm:hidden items-center mt-8 gap-2 bg-linear-to-r from-blue-50 to-green-50 border border-gray-200 rounded-xl p-2 w-full justify-between shadow-md">
                {/* Call Section */}
                <a
                  href="tel:+919665181246"
                  className="flex items-center gap-2 flex-1 group"
                >
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-md flex-shrink-0">
                    <FaPhone className="text-white text-sm" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-[10px] text-blue-600/80 font-semibold uppercase tracking-wider">
                      Call Now
                    </p>
                    <span className="font-bold text-xs text-gray-900 block truncate">
                      +91 96651 81246
                    </span>
                  </div>
                </a>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-300 mx-1"></div>

                {/* WhatsApp Section */}
                <a
                  href="https://wa.me/+919665181246"
                  className="flex items-center gap-2 group flex-1 justify-center"
                >
                  <div className="w-10 h-10 border rounded-xl flex-1 border-green-500 flex items-center justify-center transition-all duration-300 shadow-md flex-shrink-0">
                    <FaWhatsapp className="text-green-500 text-xl" />
                  </div>
                </a>
              </div>

              {/* Floating Quality Badge - Mobile Optimized */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 bg-white/90 backdrop-blur-md border border-blue-100 shadow-lg rounded-lg sm:rounded-2xl p-2 sm:p-4 lg:p-5 text-center transform hover:scale-105 transition-all duration-500 z-40">
                <div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 mx-auto mb-1 sm:mb-2 lg:mb-3 bg-linear-to-br from-blue-500 to-blue-600 rounded-md sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md">
                  <FaShieldAlt className="text-white text-xs sm:text-base lg:text-2xl" />
                </div>
                <span className="text-xs sm:text-sm lg:text-lg font-bold text-gray-900 block">
                  Quality
                </span>
                <p className="text-gray-600 text-xs font-semibold">
                  Certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}