import { FaAward, FaUsers, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';

export default function AboutSection() {
  const stats = [
    {
      icon: FaAward,
      value: "15+",
      label: "Years Experience",
      description: "Trusted since 2009"
    },
    {
      icon: FaUsers,
      value: "500+",
      label: "Projects Completed",
      description: "Across Mumbai & Thane"
    },
    {
      icon: FaMapMarkerAlt,
      value: "100%",
      label: "Area Coverage",
      description: "Mumbai & Thane Region"
    },
    {
      icon: FaShieldAlt,
      value: "ISO",
      label: "Quality Certified",
      description: "Premium Standards"
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-200/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-100/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaAward className="text-blue-600" />
            <span>TRUSTED SINCE 2009</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Leading Steel Fabrication
            <span className="block bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Experts in Mumbai
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Delivering premium steel fabrication solutions with <strong className="text-gray-800">precision engineering</strong> and 
            <strong className="text-gray-800"> uncompromising quality</strong> for over 15 years.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            {/* Main Description */}
            <div className="space-y-4 md:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                <strong className="text-gray-900">RN All Steel Fabrication</strong> has been at the forefront of 
                steel fabrication services in Mumbai and Thane, building a reputation for excellence, 
                reliability, and superior craftsmanship.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                We specialize in creating <strong className="text-gray-900">custom steel solutions</strong> that 
                combine structural integrity with aesthetic appeal, serving diverse sectors including 
                residential complexes, commercial establishments, and industrial facilities.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Our commitment to using <strong className="text-gray-900">premium materials</strong>, advanced 
                fabrication techniques, and stringent quality control ensures that every project 
                meets the highest standards of durability and safety.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                "Precision Engineering",
                "Quality Certified Materials",
                "Timely Project Completion",
                "Competitive Pricing",
                "Custom Design Solutions",
                "After-Sales Support"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 text-gray-700 group">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-all duration-300 flex-shrink-0">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full group-hover:bg-white transition-colors duration-300"></div>
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300 text-sm sm:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Side */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-500 group transform hover:-translate-y-2"
                >
                  <div className="text-center">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 shadow-lg">
                      <stat.icon className="text-white text-lg sm:text-xl" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="text-xs text-gray-500 font-medium">
                      {stat.description}
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
