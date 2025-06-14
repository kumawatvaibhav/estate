import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAllNav, setShowAllNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { data: userData } = useQuery<User | null>({
    queryKey: ["/api/user"]
  });

  const isAuthenticated = !!userData;

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide header when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-32 md:h-36"></div>
      
      <header className={`fixed top-4 left-4 right-4 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Crystal Floating Container */}
        <div className="relative backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Crystal overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/10 via-transparent to-teal-400/10 pointer-events-none"></div>
          
          {/* Subtle grid pattern for crystal effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{
                 backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                 backgroundSize: '20px 20px'
               }}>
          </div>
          
          {/* Top Bar - Help, Login, etc. */}
          <div className="relative bg-gradient-to-r from-white/15 via-white/10 to-white/15 border-b border-white/20 py-2 hidden md:block">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <div className="text-xs text-gray-700 flex items-center space-x-4">
                {/* <span className="bg-yellow-200/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-300/30">
                  For guidance : 1800-41-99099
                </span> */}
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <a href="#" className="text-gray-700 hover:text-teal-700 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-teal-100/30 backdrop-blur-sm border border-transparent hover:border-teal-200/30">
                  Download App
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-700 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-blue-100/30 backdrop-blur-sm border border-transparent hover:border-blue-200/30">
                  Advertise
                </a>
                <a href="#" className="text-gray-700 hover:text-teal-700 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-teal-100/30 backdrop-blur-sm border border-transparent hover:border-teal-200/30">
                  Forum
                </a>
                
                {isAuthenticated ? (
                  <div className="relative group">
                    <button className="text-gray-800 font-medium flex items-center bg-blue-100/30 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-blue-200/40 transition-all duration-300 border border-blue-200/30">
                      <span>My Account</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl py-2 border border-white/30 hidden group-hover:block">
                      <a href="/dashboard" className="block px-4 py-3 text-sm text-gray-800 hover:bg-blue-100/30 hover:text-blue-800 transition-all duration-300 rounded-lg mx-2">
                        Dashboard
                      </a>
                      <a href="/profile" className="block px-4 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-lg mx-2">
                        My Profile
                      </a>
                      <button 
                        className="w-full text-left px-4 py-3 text-sm text-gray-800 hover:bg-red-100/30 hover:text-red-800 transition-all duration-300 rounded-lg mx-2"
                        onClick={async () => {
                          await fetch("/api/logout", { method: "POST" });
                          window.location.reload();
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <a href="/login" className="text-blue-700 font-medium bg-blue-100/30 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-blue-200/40 transition-all duration-300 border border-blue-200/30">
                      Login
                    </a>
                    <span className="text-gray-400">|</span> 
                    <a href="/signup" className="text-teal-700 font-medium bg-teal-100/30 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-teal-200/40 transition-all duration-300 border border-teal-200/30">
                      Register
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="relative bg-gradient-to-r from-white/10 via-white/5 to-white/10 py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <div className="w-32 h-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white flex items-center justify-center rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20">
                    <span className="font-bold text-xl">99acres</span>
                  </div>
                </a>
              </div>
              
              {/* Main Menu - Desktop */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative group">
                  <button className="text-gray-800 font-medium flex items-center px-5 py-3 rounded-2xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-200/30">
                    <span>Buy</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-52 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl py-3 border border-white/30 hidden group-hover:block">
                    <a href="/properties?listing_type=sale&property_type=apartment" className="block px-5 py-3 text-sm text-gray-800 hover:bg-blue-100/30 hover:text-blue-800 transition-all duration-300 rounded-xl mx-3">
                      Apartments
                    </a>
                    <a href="/properties?listing_type=sale&property_type=house" className="block px-5 py-3 text-sm text-gray-800 hover:bg-blue-100/30 hover:text-blue-800 transition-all duration-300 rounded-xl mx-3">
                      Houses
                    </a>
                    <a href="/properties?listing_type=sale&property_type=villa" className="block px-5 py-3 text-sm text-gray-800 hover:bg-blue-100/30 hover:text-blue-800 transition-all duration-300 rounded-xl mx-3">
                      Villas
                    </a>
                    <a href="/properties?listing_type=sale&property_type=plot" className="block px-5 py-3 text-sm text-gray-800 hover:bg-blue-100/30 hover:text-blue-800 transition-all duration-300 rounded-xl mx-3">
                      Plots
                    </a>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="text-gray-800 font-medium flex items-center px-5 py-3 rounded-2xl hover:bg-teal-100/30 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-teal-200/30">
                    <span>Rent</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-52 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl py-3 border border-white/30 hidden group-hover:block">
                    <a href="/properties?listing_type=rent&property_type=apartment" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Apartments
                    </a>
                    <a href="/properties?listing_type=rent&property_type=house" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Houses
                    </a>
                    <a href="/properties?listing_type=rent&property_type=villa" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Villas
                    </a>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="text-gray-800 font-medium flex items-center px-5 py-3 rounded-2xl hover:bg-yellow-100/30 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-yellow-200/30">
                    <span>Sell</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-52 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl py-3 border border-white/30 hidden group-hover:block">
                    <a href="/post-property" className="block px-5 py-3 text-sm text-gray-800 hover:bg-yellow-100/30 hover:text-yellow-800 transition-all duration-300 rounded-xl mx-3">
                      Post Property
                    </a>
                    <a href="/seller-dashboard" className="block px-5 py-3 text-sm text-gray-800 hover:bg-yellow-100/30 hover:text-yellow-800 transition-all duration-300 rounded-xl mx-3">
                      Seller Dashboard
                    </a>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="text-gray-800 font-medium flex items-center px-5 py-3 rounded-2xl hover:bg-teal-100/30 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-teal-200/30">
                    <span>Property Services</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-56 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl py-3 border border-white/30 hidden group-hover:block">
                    <a href="/home-loans" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Home Loans
                    </a>
                    <a href="/legal-services" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Legal Services
                    </a>
                    <a href="/property-valuation" className="block px-5 py-3 text-sm text-gray-800 hover:bg-teal-100/30 hover:text-teal-800 transition-all duration-300 rounded-xl mx-3">
                      Property Valuation
                    </a>
                  </div>
                </div>
                
                <a href="/post-property" className="text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-7 py-3 rounded-2xl text-sm font-medium shadow-xl hover:shadow-2xl transition-all duration-300 ml-4 backdrop-blur-sm border border-red-400/30">
                  POST PROPERTY <span className="text-xs font-normal opacity-90">FREE</span>
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button 
                  className="text-gray-800 p-3 rounded-2xl hover:bg-white/20 backdrop-blur-sm transition-all duration-300 border border-white/20"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden mt-20" onClick={() => setMenuOpen(false)}>
            <div className="bg-white/20 backdrop-blur-2xl w-3/4 h-full overflow-y-auto rounded-r-3xl shadow-2xl border-r border-white/30" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-white/30 bg-gradient-to-br from-white/20 via-white/10 to-white/20">
                {isAuthenticated ? (
                  <div>
                    <div className="font-medium text-gray-800">{userData?.name}</div>
                    <button 
                      className="mt-4 text-red-700 bg-red-100/30 backdrop-blur-sm px-5 py-2.5 rounded-xl hover:bg-red-200/40 transition-all duration-300 border border-red-200/30"
                      onClick={async () => {
                        await fetch("/api/logout", { method: "POST" });
                        window.location.reload();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <a href="/login" className="flex-1 text-center py-3 border border-blue-400/50 text-blue-700 rounded-xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300">
                        Login
                      </a>
                      <a href="/signup" className="flex-1 text-center py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-lg">
                        Sign Up
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <a href="/post-property" className="block w-full text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3.5 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-xl font-medium">
                    POST PROPERTY <span className="text-xs opacity-90">FREE</span>
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-white/30 pb-4">
                    <div className="flex justify-between items-center p-4 bg-blue-100/20 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-blue-100/30 transition-all duration-300 border border-blue-200/30" onClick={() => setShowAllNav(prev => !prev)}>
                      <span className="font-medium text-gray-800">Buy</span>
                      <svg className={`w-4 h-4 transform transition-transform duration-300 ${showAllNav ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {showAllNav && (
                      <div className="mt-4 pl-4 space-y-2">
                        <a href="/properties?listing_type=sale&property_type=apartment" className="block text-sm text-gray-800 py-3 px-4 rounded-xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300">
                          Apartments
                        </a>
                        <a href="/properties?listing_type=sale&property_type=house" className="block text-sm text-gray-800 py-3 px-4 rounded-xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300">
                          Houses
                        </a>
                        <a href="/properties?listing_type=sale&property_type=villa" className="block text-sm text-gray-800 py-3 px-4 rounded-xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300">
                          Villas
                        </a>
                        <a href="/properties?listing_type=sale&property_type=plot" className="block text-sm text-gray-800 py-3 px-4 rounded-xl hover:bg-blue-100/30 backdrop-blur-sm transition-all duration-300">
                          Plots
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-b border-white/30 pb-4">
                    <div className="flex justify-between items-center p-4 bg-teal-100/20 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-teal-100/30 transition-all duration-300 border border-teal-200/30">
                      <span className="font-medium text-gray-800">Rent</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border-b border-white/30 pb-4">
                    <div className="flex justify-between items-center p-4 bg-yellow-100/20 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-yellow-100/30 transition-all duration-300 border border-yellow-200/30">
                      <span className="font-medium text-gray-800">Sell</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border-b border-white/30 pb-4">
                    <div className="flex justify-between items-center p-4 bg-teal-100/20 backdrop-blur-sm rounded-2xl cursor-pointer hover:bg-teal-100/30 transition-all duration-300 border border-teal-200/30">
                      <span className="font-medium text-gray-800">Property Services</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;