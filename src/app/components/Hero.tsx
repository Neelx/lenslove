'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Heart, MessageCircle, Users, Sparkles, Shield, ChevronDown, Menu, X, Check, Star, ArrowRight, Brain, Zap, Lock, Globe, BarChart3, TrendingUp, Award, Gift, Headphones, BookOpen, Mail, Phone, MapPin, Clock, ChevronRight, Hash, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

// Add CSS styles directly to the component
const styles = `
@import "tailwindcss";

:root {
  --background: #ffccf9;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #4a2c4a;
    --foreground: #ffd4fa;
  }
}

body {
  background: linear-gradient(135deg, #ffb3d9 0%, #ffd4fa 50%, #ffccf9 100%);
  background-attachment: fixed;
  color: var(--foreground);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@media (prefers-color-scheme: dark) {
  body {
    background: linear-gradient(135deg, #5d3a5d 0%, #4a2c4a 50%, #3d1f3d 100%);
  }
}

/* Custom animations that can't be easily done with Tailwind */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes sparkle {
  0%, 100% { 
    opacity: 0;
    transform: scale(0);
  }
  50% { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes orbFloat1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes orbFloat2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-25px, 25px) scale(0.95); }
  66% { transform: translate(15px, -15px) scale(1.05); }
}

@keyframes orbFloat3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  33% { transform: translate(calc(-50% + 20px), calc(-50% - 20px)) scale(1.08); }
  66% { transform: translate(calc(-50% - 15px), calc(-50% + 15px)) scale(0.92); }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

/* Tailwind utilities for custom animations */
@layer utilities {
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-heartbeat {
    animation: heartbeat 1.5s ease-in-out infinite;
  }
  
  .animate-sparkle {
    animation: sparkle 2s ease-in-out infinite;
  }
  
  .animate-orb-float-1 {
    animation: orbFloat1 20s ease-in-out infinite;
  }
  
  .animate-orb-float-2 {
    animation: orbFloat2 20s ease-in-out infinite 5s;
  }
  
  .animate-orb-float-3 {
    animation: orbFloat3 20s ease-in-out infinite 10s;
  }
  
  .animate-blob {
    animation: blob 7s infinite;
  }
  
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-600 { animation-delay: 600ms; }
  .delay-700 { animation-delay: 700ms; }
  .delay-1000 { animation-delay: 1000ms; }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  body {
    background: var(--background);
  }
}
`;

// Navigation Component with dropdown menus
const Navigation = () => {
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
          isOpen ? 'text-gray-900 bg-white/20' : 'text-gray-800 hover:text-gray-900 hover:bg-white/10'
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
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 overflow-hidden">
              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <style jsx global>{styles}</style>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.1)]' : 'bg-white/60 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <span className="text-2xl group-hover:scale-110 transition-transform inline-block drop-shadow-md">💕</span>
                  <div className="absolute inset-0 bg-[#e68ab8] blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                </div>
                <span className="font-bold text-xl text-gray-900 drop-shadow-md">LoveAI</span>
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
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#e68ab8]/10 transition-colors group"
                      >
                        <div className="p-2 bg-[#e68ab8]/20 text-[#e68ab8] rounded-lg group-hover:bg-[#e68ab8]/30 transition-all">
                          {product.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{product.title}</h3>
                            {product.badge && (
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                product.badge === 'New' ? 'bg-green-100 text-green-700' : 'bg-[#e68ab8]/20 text-[#e68ab8]'
                              }`}>
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-0.5">{product.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <a href="#all-products" className="flex items-center gap-2 text-sm font-medium text-[#e68ab8] hover:text-[#e68ab8] transition-colors">
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
                        <h3 className="font-medium text-gray-900 mb-3">{section.category}</h3>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <a href={item.link} className="text-sm text-gray-600 hover:text-[#e68ab8] transition-colors">
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

              <a href="#pricing" className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 hover:bg-white/10 rounded-lg transition-all duration-200">
                Pricing
              </a>
              
              <a href="#about" className="px-3 py-2 text-sm font-medium text-gray-800 hover:text-gray-900 hover:bg-white/10 rounded-lg transition-all duration-200">
                About
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="#signin" className="text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors">
                Sign in
              </a>
              <a
                href="#signup"
                className="px-5 py-2.5 bg-[#e68ab8] hover:bg-[#d67ba8] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-[1px] transition-all duration-300"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-gray-900" /> : <Menu className="w-5 h-5 text-gray-900" />}
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
            isMenuOpen ? 'opacity-30' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white/95 backdrop-blur-md shadow-xl transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💕</span>
              <span className="font-bold text-xl text-gray-900">LoveAI</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-900" />
            </button>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Products Section */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Products</h3>
              <div className="space-y-2">
                {products.map((product, idx) => (
                  <a
                    key={idx}
                    href={product.link}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-1.5 bg-[#e68ab8]/20 text-[#e68ab8] rounded">
                      {product.icon}
                    </div>
                    <span className="text-sm text-gray-700">{product.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Other Links */}
            <div className="space-y-3">
              <a href="#pricing" className="block text-gray-700 hover:text-gray-900 hover:pl-2 transition-all">
                Pricing
              </a>
              <a href="#about" className="block text-gray-700 hover:text-gray-900 hover:pl-2 transition-all">
                About
              </a>
              <a href="#help" className="block text-gray-700 hover:text-gray-900 hover:pl-2 transition-all">
                Help Center
              </a>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <a href="#signin" className="block w-full py-2 text-center text-gray-700 hover:text-gray-900 transition-colors">
                Sign in
              </a>
              <a
                href="#signup"
                className="block w-full py-3 px-4 bg-[#e68ab8] hover:bg-[#d67ba8] text-white text-center font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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

// Hero Section
const HeroSection = () => {
  const [mounted, setMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-5 py-20 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">💕</div>
        <div className="absolute top-32 right-20 text-4xl opacity-15 animate-float delay-300">💖</div>
        <div className="absolute bottom-40 left-1/4 text-5xl opacity-20 animate-float delay-500">💗</div>
        <div className="absolute top-1/3 right-1/3 text-3xl opacity-15 animate-float delay-700">💝</div>
        <div className="absolute bottom-20 right-1/4 text-6xl opacity-20 animate-float delay-1000">💓</div>
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[20%] w-2 h-2 bg-[#e68ab8] rounded-full animate-sparkle"></div>
        <div className="absolute top-[25%] right-[15%] w-3 h-3 bg-[#e68ab8] rounded-full animate-sparkle delay-300"></div>
        <div className="absolute bottom-[30%] left-[10%] w-2 h-2 bg-[#e68ab8] rounded-full animate-sparkle delay-500"></div>
        <div className="absolute top-[60%] right-[25%] w-3 h-3 bg-[#e68ab8] rounded-full animate-sparkle delay-700"></div>
        <div className="absolute bottom-[15%] right-[40%] w-2 h-2 bg-[#e68ab8] rounded-full animate-sparkle delay-1000"></div>
      </div>

      <div className="max-w-4xl text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-full text-gray-700 text-sm font-medium border border-white/30">
            <Sparkles className="w-4 h-4 text-[#e68ab8]" />
            AI-Powered Relationship Insights
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          Discover Your Key Features{' '}
          <span className="text-[#e68ab8] inline-block relative">
            for Navigating Love
            <span className="absolute -top-6 -right-8 text-2xl animate-heartbeat">💕</span>
          </span>{' '}
          and Relationships
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our AI Relationship Advisor offers personalized insights tailored to your love life. With features designed to support and uplift, you can explore your emotions and relationships in a safe space. Dive into your feelings and find clarity with our innovative tools.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <button 
            onClick={() => setIsChatOpen(true)}
            className="px-8 py-4 text-base font-semibold rounded-full bg-[#e68ab8] hover:bg-[#d67ba8] text-white shadow-lg hover:shadow-xl hover:-translate-y-[2px] transition-all duration-300 inline-flex items-center gap-2"
          >
            Try
          </button>

          <button className="px-8 py-4 text-base font-semibold rounded-full bg-white/60 hover:bg-white/80 text-gray-900 border border-white/30 hover:border-white/50 transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Chat Interface Modal */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Love AI Chat</h3>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600">Chat interface would appear here</p>
          </div>
        </div>
      )}
    </section>
  );
};

// Products Section
const ProductsSection = () => {
  const products = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "AI Relationship Advisor: Your Personal Love Guide",
      description: "Choose from Therapist, Bestie, or Logical Bro modes for tailored advice.",
      cta: "Explore"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Anonymous Vent Box: Share Freely, Heal Together",
      description: "Express your thoughts anonymously and connect with a supportive community.",
      cta: "Vent"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Chat Analyzer: Understand Your Conversations Better",
      description: "Analyze your chats to uncover tone, patterns, and emotional flags.",
      cta: "Analyze"
    }
  ];

  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/30"
            >
              <div className="w-16 h-16 bg-[#e68ab8]/20 rounded-xl flex items-center justify-center text-[#e68ab8] mb-6">
                {product.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              <button className="text-[#e68ab8] hover:text-[#d67ba8] font-semibold transition-colors inline-flex items-center gap-2">
                {product.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Vibe Section
const VibeSection = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Couple having coffee"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-[#e68ab8] mb-4">Vibe</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Discover Your Love Life Insights with AI
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our AI analyzes your interactions to provide personalized insights. Understand your emotional patterns 
              and improve your relationships effortlessly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Your Vibe</h3>
                <p className="text-gray-700">
                  Get clarity on your feelings and relationship dynamics with our AI-powered analysis.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Relationship Insights</h3>
                <p className="text-gray-700">
                  Uncover the reasons behind your emotions and improve your love life.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors">
                Analyze
              </button>
              <button className="px-6 py-3 text-gray-900 hover:text-[#e68ab8] font-semibold transition-colors inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fun Section
const FunSection = () => {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Create Your Mood Card",
      description: "Generate personalized messages that resonate with your feelings.",
      cta: "Generate"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join the Vibe Community",
      description: "Share your insights and connect with like-minded individuals.",
      cta: "Join"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Unlock Your Relationship Potential",
      description: "Discover new ways to enhance your love life.",
      cta: "Unlock"
    }
  ];

  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm font-semibold text-[#e68ab8] mb-4">Fun</div>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Share Your Vibes with the World
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl">
          Express yourself and connect with others through our unique Vibe Badges. Whether you're a 'Soft Texter' 
          or a 'Green Flag', let your personality shine!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#e68ab8]/20 rounded-full flex items-center justify-center text-[#e68ab8] mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2">
            Share
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Anonymous Vent Section
const AnonymousVentSection = () => {
  const features = [
    "Express your feelings without judgment.",
    "Join a supportive community of listeners.",
    "Your voice matters; let it be heard."
  ];

  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Share Your Thoughts Anonymously and Connect with Others in Our Community
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Feeling overwhelmed? Our Anonymous Vent Box allows you to express your thoughts freely, providing a safe space to share and connect with others who understand.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#e68ab8] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Person using laptop"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Chat Analyzer Section
const ChatAnalyzerSection = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-[#e68ab8] mb-4">Analyze</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Unlock Insights from Your Conversations
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Transform your chats into meaningful insights with our Chat Analyzer. Upload or paste your WhatsApp or DM conversations to uncover tone, flags, patterns, and initiators.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">50%</div>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">50%</div>
                <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors">
                Start
              </button>
              <button className="px-6 py-3 text-gray-900 hover:text-[#e68ab8] font-semibold transition-colors inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Two people laughing"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Insights Section
const InsightsSection = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-[#e68ab8] mb-4">Insights</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Track Your Emotions and Love Languages
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
              Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#e68ab8]/20 rounded flex items-center justify-center text-[#e68ab8] flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Subheading one</h3>
                  <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#e68ab8]/20 rounded flex items-center justify-center text-[#e68ab8] flex-shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Subheading two</h3>
                  <p className="text-gray-700 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors">
                Explore
              </button>
              <button className="px-6 py-3 text-gray-900 hover:text-[#e68ab8] font-semibold transition-colors inline-flex items-center gap-2">
                Learn
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Two people working together"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Advice Section
const AdviceSection = () => {
  return (
    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-[#e68ab8] mb-4">Advice</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your AI-Powered Relationship Companion Awaits
            </h2>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Mode</h3>
                <p className="text-gray-700">
                  Select from Therapist, Bestie, or Logical Bro for tailored advice.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Ask Anything</h3>
                <p className="text-gray-700">
                  No question is too big or small; we're here to help.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors">
                Start
              </button>
              <button className="px-6 py-3 text-gray-900 hover:text-[#e68ab8] font-semibold transition-colors inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/600/400" 
              alt="Couple relaxing"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is this app?",
      answer: "Our AI Relationship Advisor is designed to help you navigate your love life. You can ask questions, vent anonymously, and analyze your chats. It's a safe space for exploring your feelings."
    },
    {
      question: "Is it confidential?",
      answer: "Absolutely! Your privacy is our priority. Conversations are anonymous, and we do not share your data with anyone."
    },
    {
      question: "How does it work?",
      answer: "Simply input your questions or thoughts, and our AI will provide insights and advice. You can also upload chat logs for analysis. It's all about understanding your emotions better."
    },
    {
      question: "Can I share feedback?",
      answer: "Yes! We encourage user feedback to improve our services. You can share your thoughts directly through the app or via our support channels."
    },
    {
      question: "Is there a cost?",
      answer: "Our basic features are free to use. Premium options may be available for advanced insights and personalized support. Stay tuned for updates!"
    }
  ];

  return (
    <section className="py-20 px-5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 text-center">FAQs</h2>
        <p className="text-lg text-gray-700 mb-12 text-center">
          Find answers to your most pressing questions about our AI Relationship Advisor.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/40 transition-colors"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
          <p className="text-gray-700 mb-6">Reach out to our support team anytime!</p>
          <button className="px-6 py-3 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-lg font-semibold transition-colors">
            Contact
          </button>
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const FinalCTASection = () => {
  return (
    <section className="py-20 px-5 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
          Understand Your Love Life with AI
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Ask anything, vent anonymously, analyze chats, and find clarity — all in one safe space. 
          Your journey to better relationships starts here.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-[#e68ab8] hover:bg-[#d67ba8] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-[1px] transition-all duration-300">
            Try
          </button>
          <button className="px-8 py-4 bg-white/60 hover:bg-white/80 text-gray-900 rounded-full font-semibold text-lg border border-white/30 hover:border-white/50 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function LoveAILandingPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <VibeSection />
      <FunSection />
      <AnonymousVentSection />
      <ChatAnalyzerSection />
      <InsightsSection />
      <AdviceSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}