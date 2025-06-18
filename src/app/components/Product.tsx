'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e68ab8] via-[#e69ad1] to-[#e6a6e6]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-gray-700 mb-2">Vibe</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Discover Your Love<br />
            Life Insights with AI
          </h1>
          <p className="text-gray-700 max-w-2xl">
            Our AI analyzes your interactions to provide personalized insights. Understand your emotional patterns and improve your relationships effortlessly.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Vibe</h2>
            <p className="text-gray-700 mb-8">
              Get clarity on your feelings and relationship dynamics with our AI-powered analysis.
            </p>
            <button className="inline-flex items-center text-gray-900 font-medium hover:gap-3 transition-all duration-300">
              Analyze
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Relationship Insights</h2>
            <p className="text-gray-700 mb-8">
              Uncover the reasons behind your emotions and improve your love life.
            </p>
            <button className="inline-flex items-center text-gray-900 font-medium hover:gap-3 transition-all duration-300">
              Learn More
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Analysis for Better Relationships
              </h3>
              <p className="text-gray-700 mb-6">
                Upload your conversations and get instant insights into communication patterns, emotional dynamics, and relationship health metrics.
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300">
                  Get Started
                </button>
                <button className="px-6 py-2 text-gray-900 font-medium hover:text-gray-700 transition-colors duration-300">
                  View Demo →
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#e68ab8]/20 to-[#e6a6e6]/20 rounded-xl h-64 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Image placeholder</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductsPage