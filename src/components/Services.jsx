import { FaRulerCombined, FaDoorClosed, FaShieldAlt, FaUtensils, FaIndustry, FaTools, FaArrowRight } from 'react-icons/fa'

const services = [
  {
    name: 'Steel Railings',
    description: 'Custom-designed steel railings for staircases, balconies, and terraces with durable finishes.',
    icon: FaRulerCombined,
    image: '/projects/railings/stainless-steel-staircase-railing.webp',
    features: ['Custom Designs', 'Durable Finish', 'Easy Installation']
  },
  {
    name: 'Security Doors & Gates',
    description: 'Robust security solutions including main gates, compound gates, and security doors.',
    icon: FaDoorClosed,
    image: '/projects/main-doors/ss-designer-main-door.webp',
    features: ['High Security', 'Weather Resistant', 'Custom Sizes']
  },
  {
    name: 'Window & Balcony Grills',
    description: 'Aesthetic and secure grills for windows and balconies in various designs and patterns.',
    icon: FaShieldAlt,
    image: '/projects/window-grills/stainless-steel-window-grill-modern.webp',
    features: ['Aesthetic Designs', 'Enhanced Security', 'Multiple Patterns']
  },
  {
    name: 'Kitchen Trolleys & Counters',
    description: 'Stainless steel kitchen trolleys, counters, and storage solutions for modern kitchens.',
    icon: FaUtensils,
    image: '/projects/street-stalls/stainless-steel-food-cart-stall.webp',
    features: ['Stainless Steel', 'Hygienic', 'Space Saving']
  },
  {
    name: 'Industrial Structures',
    description: 'Heavy-duty industrial structures, sheds, and support systems for commercial use.',
    icon: FaIndustry,
    image: '/images/banner.jpg',
    features: ['Heavy Duty', 'Commercial Grade', 'Custom Engineering']
  },
  {
    name: 'Custom Fabrication',
    description: 'Bespoke metal fabrication services tailored to your specific requirements.',
    icon: FaTools,
    image: '/images/custom-door.jpg',
    features: ['Bespoke Designs', 'Precision Work', 'Tailored Solutions']
  }
];

export default function Services() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-300/10 rounded-full blur-xl"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full mb-4">
            <FaTools className="text-blue-600 text-sm" />
            <span className="text-sm font-semibold uppercase tracking-wider">Our Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Premium Steel
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent block">Fabrication</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert steel fabrication solutions crafted with precision and quality for residential, commercial, and industrial applications
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50"
            >
              {/* Image Section with Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-blue-600 text-xl" />
                </div>
                
                {/* Features Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 group/btn">
                  <span>Explore Service</span>
                  <FaArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

   
      </div>
    </section>
  )
}