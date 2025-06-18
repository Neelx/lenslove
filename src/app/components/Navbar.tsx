'use client'
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Heart, MessageCircle, Brain, Users, Sparkles, Shield, Star, Zap } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "AI Love Advisor",
      description: "Get personalized relationship advice",
      badge: "Popular",
      link: "#advisor"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Chat Analyzer",
      description: "Understand your conversations better",
      link: "#analyzer"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Compatibility Test",
      description: "Discover your love compatibility",
      badge: "New",
      link: "#compatibility"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Anonymous Vent",
      description: "Share and connect safely",
      link: "#vent"
    }
  ];

  const resources = [
    {
      category: "Learn",
      items: [
        { title: "Love Languages Guide", link: "#guide" },
        { title: "Relationship Tips", link: "#tips" },
        { title: "Success Stories", link: "#stories" }
      ]
    },
    {
      category: "Support",
      items: [
        { title: "Help Center", link: "#help" },
        { title: "Community", link: "#community" },
        { title: "Contact Us", link: "#contact" }
      ]
    }
  ];

  const NavDropdown = ({ title, isOpen, children }) => (
    <div className="relative">
      <button
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
          isOpen ? 'text-white bg-white/20' : 'text-white/90 hover:text-white hover:bg-white/10'
        }`}
        onClick={() => setActiveDropdown(isOpen ? null : title)}
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)} />
          <div className="absolute top-full left-0 mt-2 w-screen max-w-md transform -translate-x-1/4 z-40">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(230,138,184,0.25)] border border-pink-200/50 overflow-hidden">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gradient-to-r from-[#e68ab8]/95 via-[#e69ad1]/95 to-[#e6a6e6]/95 backdrop-blur-md shadow-[0_2px_20px_rgba(230,138,184,0.3)]' : 'bg-gradient-to-r from-[#e68ab8]/80 via-[#e69ad1]/80 to-[#e6a6e6]/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block drop-shadow-md">💕</span>
                  <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                </div>
                <span className="font-bold text-xl text-white drop-shadow-md">LoveAI</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavDropdown title="Products" isOpen={activeDropdown === 'Products'}>
                <div className="p-4">
                  <div className="grid gap-3">
                    {products.map((product, idx) => (
                      <a
                        key={idx}
                        href={product.link}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-pink-50/70 transition-colors group"
                      >
                        <div className="p-2 bg-gradient-to-br from-pink-100 to-pink-50 text-[#e68ab8] rounded-lg group-hover:from-pink-200 group-hover:to-pink-100 transition-all">
                          {product.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-[#202123]">{product.title}</h3>
                            {product.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                product.badge === 'New' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' : 'bg-gradient-to-r from-pink-100 to-pink-50 text-[#e68ab8]'
                              }`}>
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#353740] mt-0.5">{product.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-pink-100/50">
                    <a href="#all-products" className="flex items-center gap-2 text-sm font-medium text-[#e68ab8] hover:text-[#e69ad1] transition-colors">
                      View all products
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </NavDropdown>

              <NavDropdown title="Resources" isOpen={activeDropdown === 'Resources'}>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-6">
                    {resources.map((section, idx) => (
                      <div key={idx}>
                        <h3 className="font-medium text-[#202123] mb-3">{section.category}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a href={item.link} className="text-sm text-[#353740] hover:text-[#e68ab8] transition-colors">
                                {item.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </NavDropdown>

              <a href="#pricing" className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                Pricing
              </a>
              
              <a href="#about" className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                About
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="#signin" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                Sign in
              </a>
              <a
                href="#signup"
                className="px-5 py-2.5 bg-white text-[#e68ab8] text-sm font-semibold rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)] hover:-translate-y-[2px] transition-all duration-300"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
        isMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-br from-[#e68ab8] via-[#e69ad1] to-[#e6a6e6] shadow-[0_0_50px_rgba(230,138,184,0.3)] transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow-md">💕</span>
              <span className="font-bold text-xl text-white drop-shadow-md">LoveAI</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Products Section */}
            <div>
              <h3 className="font-medium text-white mb-3">Products</h3>
              <div className="space-y-2">
                {products.map((product, idx) => (
                  <a
                    key={idx}
                    href={product.link}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="p-1.5 bg-white/20 text-white rounded backdrop-blur-sm">
                      {product.icon}
                    </div>
                    <span className="text-sm text-white/90">{product.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Other Links */}
            <div className="space-y-3">
              <a href="#pricing" className="block text-white/90 hover:text-white hover:pl-2 transition-all">
                Pricing
              </a>
              <a href="#about" className="block text-white/90 hover:text-white hover:pl-2 transition-all">
                About
              </a>
              <a href="#help" className="block text-white/90 hover:text-white hover:pl-2 transition-all">
                Help Center
              </a>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-white/20">
              <a href="#signin" className="block w-full py-2 text-center text-white/90 hover:text-white transition-colors">
                Sign in
              </a>
              <a
                href="#signup"
                className="block w-full py-3 px-4 bg-white text-[#e68ab8] text-center font-semibold rounded-full shadow-[0_4px_24px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.35)] hover:-translate-y-[1px] transition-all duration-300"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;