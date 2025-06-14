import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { City } from "@/lib/types";

const TabButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
  <button 
    className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-full ${active 
      ? 'bg-white text-gray-900 shadow-md' 
      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const BentoCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <div 
    className={`bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${className}`}
    style={{ 
      animationDelay: `${delay}ms`,
      animation: 'fadeInScale 0.8s ease-out forwards'
    }}
  >
    {children}
  </div>
);

const PropertySlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const properties = [
    {
      id: 1,
      title: "Modern 3BHK Apartment",
      location: "Bandra West, Mumbai",
      price: "₹2.5 Cr",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&crop=center",
      type: "Apartment",
      area: "1,850 sqft",
      status: "Ready to Move"
    },
    {
      id: 2,
      title: "Luxury Villa with Garden",
      location: "Whitefield, Bangalore",
      price: "₹1.8 Cr",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center",
      type: "Villa",
      area: "2,400 sqft",
      status: "Under Construction"
    },
    {
      id: 3,
      title: "Premium Office Space",
      location: "Connaught Place, Delhi",
      price: "₹85 L",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=center",
      type: "Commercial",
      area: "1,200 sqft",
      status: "Ready to Move"
    },
    {
      id: 4,
      title: "Sea-facing Penthouse",
      location: "Marine Drive, Mumbai",
      price: "₹4.2 Cr",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&crop=center",
      type: "Penthouse",
      area: "3,200 sqft",
      status: "Ready to Move"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % properties.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length);
  };

  return (
    <div className="relative h-full rounded-3xl overflow-hidden bg-gray-100">
      <div className="relative h-full">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Property Image Background */}
            <div className="relative h-full">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Property Details */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    {property.status}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                    {property.type}
                  </span>
                </div>
                <h3 className="text-3xl font-semibold mb-3 tracking-tight">{property.title}</h3>
                <p className="text-lg mb-4 flex items-center opacity-90">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {property.location}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold">{property.price}</div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">Area</div>
                    <div className="font-semibold text-lg">{property.area}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial' | 'pg'>('buy');
  const [propertyType, setPropertyType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");

  const { data: cities = [] } = useQuery<City[]>({
    queryKey: ["/api/cities"],
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (activeTab === 'buy') params.set("listing_type", "sale");
    if (activeTab === 'rent') params.set("listing_type", "rent");
    if (activeTab === 'pg') params.set("listing_type", "pg");
    if (activeTab === 'commercial') params.set("property_type", "commercial");
    
    if (propertyType) params.set("property_type", propertyType);
    if (selectedCity) params.set("city_id", selectedCity);
    if (budget) {
      const [min, max] = budget.split("-");
      if (min) params.set("min_price", min);
      if (max) params.set("max_price", max);
    }
    if (bedrooms) params.set("bedrooms", bedrooms);
    if (searchQuery) params.set("keyword", searchQuery);
    
    setLocation(`/properties?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <style>{`
        @keyframes fadeInScale {
          from { 
            opacity: 0; 
            transform: translateY(20px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-20">
        
        {/* Bento Grid Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* Main Slideshow - Left Side */}
            <div className="lg:col-span-7 h-96 lg:h-full">
              <PropertySlideshow />
            </div>
            
            {/* Right Side Content */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              
              {/* Hero Text Card */}
              <BentoCard className="flex flex-col justify-center" delay={200}>
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                    Find Your
                    <span className="block font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Perfect Home
                    </span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Discover exceptional properties with our AI-powered search across India's premier locations.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { number: "30L+", label: "Properties" },
                      { number: "100+", label: "Cities" },
                      { number: "5M+", label: "Users" }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </BentoCard>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <BentoCard className="text-center" delay={400}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Verified</h3>
                  <p className="text-xs text-gray-600">All properties verified</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={500}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">AI Powered</h3>
                  <p className="text-xs text-gray-600">Smart recommendations</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={600}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">Zero Fee</h3>
                  <p className="text-xs text-gray-600">No hidden charges</p>
                </BentoCard>
                
                <BentoCard className="text-center" delay={700}>
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">24/7 Support</h3>
                  <p className="text-xs text-gray-600">Always here to help</p>
                </BentoCard>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <BentoCard className="max-w-6xl mx-auto mb-16" delay={800}>
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 bg-gray-100/50 rounded-2xl">
            <TabButton active={activeTab === 'buy'} onClick={() => setActiveTab('buy')}>
              Buy Property
            </TabButton>
            <TabButton active={activeTab === 'rent'} onClick={() => setActiveTab('rent')}>
              Rent Property
            </TabButton>
            <TabButton active={activeTab === 'commercial'} onClick={() => setActiveTab('commercial')}>
              Commercial
            </TabButton>
            <TabButton active={activeTab === 'pg'} onClick={() => setActiveTab('pg')}>
              PG/Co-living
            </TabButton>
          </div>
          
          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select 
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id.toString()}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select 
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="plot">Plot/Land</option>
                {activeTab === 'commercial' && (
                  <>
                    <option value="office">Office Space</option>
                    <option value="shop">Shop/Showroom</option>
                  </>
                )}
              </select>
            </div>
            
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select 
                className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">Select Budget</option>
                <option value="0-2000000">Under ₹20 Lac</option>
                <option value="2000000-4000000">₹20 Lac - ₹40 Lac</option>
                <option value="4000000-6000000">₹40 Lac - ₹60 Lac</option>
                <option value="6000000-10000000">₹60 Lac - ₹1 Cr</option>
                <option value="10000000-200000000">₹1 Cr - ₹2 Cr</option>
                <option value="200000000-100000000000">Above ₹2 Cr</option>
              </select>
            </div>
            
            {/* Bedrooms */}
            {activeTab !== 'commercial' && propertyType !== 'plot' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select 
                  className="w-full p-4 bg-white border border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Select BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                  <option value="5">5+ BHK</option>
                </select>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-blue-500 transition-all group">
              <div className="pl-6 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by locality, project name, landmark..."
                className="flex-1 py-5 px-4 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-5 font-medium text-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </BentoCard>

        {/* Popular Cities */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Explore Cities
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover properties in India's most vibrant cities
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.slice(0, 6).map((city, index) => (
              <BentoCard key={city.id} className="group cursor-pointer overflow-hidden" delay={index * 100}>
                <div className="text-center">
                  {/* City Image */}
                  {city.image_url ? (
                    <div className="w-full h-24 mb-4 rounded-2xl overflow-hidden">
                      <img 
                        src={city.image_url} 
                        alt={city.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.currentTarget.style.display = 'none';
                          const iconDiv = document.createElement('div');
                          iconDiv.className = "w-full h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300";
                          iconDiv.innerHTML = `<svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`;
                          e.currentTarget.parentElement?.appendChild(iconDiv);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-24 mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                  )}
                  
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {city.property_count?.toLocaleString()} Properties
                  </p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;