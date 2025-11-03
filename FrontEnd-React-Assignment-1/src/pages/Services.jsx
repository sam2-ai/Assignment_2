import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 'humanizer',
      title: 'AI Text Humanizer',
      description: 'Transform AI-generated content into natural, human-like text that bypasses detection algorithms and engages your audience effectively.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      features: [
        'Bypass AI detection tools',
        'Maintain original meaning',
        'Natural language flow',
        'Instant processing'
      ],
      link: '/services/humanizer'
    },
    {
      id: 'prompt-optimizer',
      title: 'Prompt Optimizer',
      description: 'Enhance your AI prompts for better results with intelligent refinement tools that improve clarity, context, and effectiveness.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: [
        'Category-specific optimization',
        'Context enhancement',
        'Format specification',
        'Example integration'
      ],
      link: '/services/prompt-optimizer'
    },
    {
      id: 'readability',
      title: 'Readability Analyzer',
      description: 'Analyze and improve your content\'s readability score for better audience engagement and comprehension across all reading levels.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      features: [
        'Flesch reading score',
        'Grade level analysis',
        'Sentence structure review',
        'Improvement suggestions'
      ],
      link: '/services/readability'
    },
    {
      id: 'keyword-checker',
      title: 'Keyword Density Checker',
      description: 'Optimize your content for SEO with comprehensive keyword analysis, density checking, and strategic recommendations.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      features: [
        'Keyword density analysis',
        'SEO optimization tips',
        'Word frequency tracking',
        'Competitive analysis'
      ],
      link: '/services/keyword-checker'
    }
  ];

  return (
  <div className="min-h-screen bg-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
  <div className="bg-blue-100 rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our <span className="text-primary-600">Services</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive AI-powered tools to optimize, analyze, and enhance your written content for maximum impact and engagement.
          </p>
        </div>

        {/* Services Grid */}
  <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
  <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-blue-600">
                    {service.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={service.link}
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-blue-600 font-medium rounded-lg hover:from-primary-600 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Try {service.title}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose our Section */}
  <div className="mt-20 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 rounded-xl shadow-lg p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered tools are designed with professionals in mind, offering accuracy, speed, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Process your content in seconds with our optimized AI algorithms and cloud infrastructure.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Highly Accurate</h3>
              <p className="text-gray-600">Advanced machine learning models trained on millions of documents for precise analysis.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your content is processed securely and never stored on our servers for complete privacy.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 rounded-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Ready to Optimize Your Content?
            </h2>
            <p className="text-xl text-primary-200 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators, marketers, and professionals who trust our AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services/humanizer"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors duration-200 shadow-lg"
              >
                Start with AI Humanizer
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-blue-600 font-medium rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;