const services = [
  {
    title: 'SS/MS Railings',
    description: 'Custom stainless steel and mild steel railings for staircases, balconies, terraces, and corridors. We create durable and aesthetically pleasing designs that enhance safety while complementing your space architecture.',
    features: ['Custom designs', 'Powder coating', 'Stainless steel & MS options', 'Indoor & outdoor use'],
    image: '/images/railings-service.jpg'
  },
  {
    title: 'Security Doors & Gates',
    description: 'Heavy-duty security doors and main gates designed for maximum safety and durability. Our security solutions include decorative elements without compromising on strength and security features.',
    features: ['Burglar-proof designs', 'Multiple locking systems', 'Custom sizes', 'Decorative options'],
    image: '/images/security-doors-service.jpg'
  },
  {
    title: 'Balcony & Window Grills',
    description: 'Aesthetic and secure grills for windows and balconies available in various patterns and designs. We balance security needs with ventilation and visual appeal.',
    features: ['Various patterns', 'Anti-climb designs', 'Weather-resistant', 'Easy maintenance'],
    image: '/images/window-grills-service.jpg'
  },
  {
    title: 'Kitchen Trolleys & Counters',
    description: 'Stainless steel kitchen trolleys, counters, and storage solutions designed for modern kitchens. Hygienic, durable, and space-efficient designs for commercial and residential kitchens.',
    features: ['Food-grade stainless steel', 'Modular designs', 'Easy cleaning', 'Space optimization'],
    image: '/images/kitchen-trolleys-service.jpg'
  },
  {
    title: 'Industrial & Commercial Steel Structures',
    description: 'Heavy-duty industrial structures including sheds, warehouses, factory structures, and commercial building frameworks. Engineered for strength, durability, and compliance with industrial standards.',
    features: ['Structural engineering', 'Heavy-duty construction', 'Custom specifications', 'Industrial standards'],
    image: '/images/industrial-structures-service.jpg'
  },
  {
    title: 'Custom Metal Fabrication',
    description: 'Bespoke metal fabrication services tailored to your specific requirements. From custom furniture to specialized industrial components, we bring your ideas to life with precision engineering.',
    features: ['Design consultation', 'Precision fabrication', 'Multiple metal options', 'Quality assurance'],
    image: '/images/custom-fabrication-service.jpg'
  },
  {
    title: 'Onsite Welding & Repairs',
    description: 'Professional onsite welding services and repair work for existing steel structures. Emergency repair services and maintenance for residential, commercial, and industrial clients.',
    features: ['Emergency services', 'All welding types', 'Structural repairs', 'Maintenance contracts'],
    image: '/images/welding-repairs-service.jpg'
  }
]

export const metadata = {
  title: 'Our Services | Professional Steel Fabrication in Mumbai & Thane',
  description: 'Expert steel fabrication services including railings, security doors, industrial structures, and custom metal work. Quality craftsmanship serving Mumbai and Thane.',
}

export default function Services() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Professional Services
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive steel fabrication solutions with precision engineering and quality craftsmanship. 
            Serving residential, commercial, and industrial clients across Mumbai and Thane.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Section */}
              <div className="lg:w-1/2 w-full">
                <div className="relative group">
                  <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                  
                  {/* Service Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 w-full">
                <div className="max-w-lg mx-auto lg:mx-0">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md hover:shadow-lg">
                    Get Quote for {service.title.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center mt-20 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Project With Us
          </h2>
          <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
            Get a free consultation and detailed quote for your steel fabrication project. 
            We provide expert guidance and quality workmanship for all your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Free Consultation
            </a>
            <a 
              href="tel:+919876543210" 
              className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Call Now: +91 98765 43210
            </a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">15+</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Years Experience</h3>
            <p className="text-gray-600 text-sm">Trusted since 2009</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">500+</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Projects Completed</h3>
            <p className="text-gray-600 text-sm">Across Mumbai & Thane</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-lg">100%</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Client Satisfaction</h3>
            <p className="text-gray-600 text-sm">Quality guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  )
}