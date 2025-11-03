import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI Document Processing',
      description: 'Transform and optimize your documents with cutting-edge AI technology for maximum efficiency.',
      link: '/services/ai-processing',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Get detailed insights and analytics about your document usage and performance metrics.',
      link: '/services/analytics',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: '🔒',
      title: 'Secure Storage',
      description: 'Enterprise-grade security with end-to-end encryption to keep your documents safe.',
      link: '/services/security',
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Process thousands of documents in seconds with our optimized cloud infrastructure.',
      link: '/services/performance',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: '🌐',
      title: 'Global Access',
      description: 'Access your documents from anywhere in the world with our global CDN network.',
      link: '/services/global',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: '🎯',
      title: 'Smart Search',
      description: 'Find any document instantly with our AI-powered search and categorization system.',
      link: '/services/search',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  const stats = [
    { number: '50K+', label: '📄 Documents Processed', icon: '📊' },
    { number: '12K+', label: '👥 Happy Users', icon: '😊' },
    { number: '99.9%', label: '⚡ Uptime Guarantee', icon: '🚀' },
    { number: '24/7', label: '🛟 Expert Support', icon: '💬' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            >
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block">Transform Your</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Documents
                </span>
                <span className="block">with AI Power</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                🚀 Experience the future of document management with our intelligent platform. 
                Process, analyze, and optimize your documents with cutting-edge AI technology.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/signup"
                      className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl transition-all duration-200 transform"
                    >
                      ✨ Get Started Free
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/services"
                      className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:shadow-lg transition-all duration-200"
                    >
                      🔍 Explore Features
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md">
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Analytics</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">📄 Documents</span>
                        <span className="text-sm font-bold text-blue-600">1,247</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">⚡ Processed</span>
                        <span className="text-sm font-bold text-green-600">98.5%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">🎯 Accuracy</span>
                        <span className="text-sm font-bold text-purple-600">99.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              🌟 Trusted by Professionals Worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Join our growing community of content creators and businesses
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 sm:text-5xl"
            >
              🚀 Powerful Features
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover our comprehensive suite of AI-powered tools designed to revolutionize your document workflow
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="h-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white text-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                  >
                    Explore Feature
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-white sm:text-5xl"
          >
            🎯 Ready to Transform Your Documents?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto"
          >
            Join thousands of professionals who trust Document Optimizer to streamline their document workflow and boost productivity.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-blue-600 bg-white hover:bg-gray-50 shadow-xl hover:shadow-2xl transition-all duration-200"
              >
                🚀 Start Free Trial
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                💬 Contact Sales
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-blue-100"
          >
            ✨ No credit card required • 🔒 Enterprise-grade security • 🌟 24/7 support
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;