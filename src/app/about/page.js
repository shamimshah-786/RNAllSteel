export const metadata = {
  title: 'About Us | RN All Steel Fabrication - Mumbai & Thane',
  description: 'Learn about RN All Steel Fabrication - 15+ years of experience in steel fabrication services across Mumbai and Thane. Our mission, values, and why choose us.',
}

export default function About() {
  return (
    <div className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            About RN All Steel Fabrication
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building trust through quality steel fabrication since 2009
          </p>
        </div>

        {/* Company History */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Journey</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Established in 2009, RN All Steel Fabrication Work began as a small workshop 
                  with a vision to provide quality steel fabrication services to the Mumbai and Thane regions.
                </p>
                <p>
                  Over the past 15+ years, we have grown into a reputable business known for 
                  our reliability, craftsmanship, and commitment to customer satisfaction.
                </p>
                <p>
                  Our journey has been marked by continuous learning, adoption of new technologies, 
                  and expanding our service portfolio to meet the evolving needs of our clients.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Company Image</span>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To deliver superior steel fabrication solutions that exceed customer expectations 
                while maintaining the highest standards of quality and safety.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every project undergoes rigorous quality checks 
                to ensure durability and perfection.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We work closely with clients to understand 
                their needs and deliver customized solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose RN All Steel Fabrication?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">15+ Years Experience</h3>
                <p className="text-gray-600">Extensive expertise in steel fabrication across various sectors</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Quality Materials</h3>
                <p className="text-gray-600">We use only the best quality steel and materials</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Timely Completion</h3>
                <p className="text-gray-600">We respect deadlines and ensure on-time project delivery</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Competitive Pricing</h3>
                <p className="text-gray-600">High-quality work at reasonable and transparent prices</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Expert Team</h3>
                <p className="text-gray-600">Skilled craftsmen with years of fabrication experience</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">After-Sales Support</h3>
                <p className="text-gray-600">Comprehensive support and maintenance services</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}