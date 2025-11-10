import React from 'react';

const About = () => {
  const team = [
    {
      name: "Harry Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      bio: "Former AI researcher with 10+ years in natural language processing and content optimization.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "Machine learning expert specializing in text analysis and AI model optimization for enterprise applications.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      bio: "UX designer and product strategist focused on creating intuitive tools for content creators and marketers.",
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We continuously push the boundaries of AI technology to provide cutting-edge solutions.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'Quality',
      description: 'Every tool we build meets the highest standards of accuracy and reliability.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Privacy',
      description: 'Your content and data security are our top priorities in everything we do.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: 'Accessibility',
      description: 'We make powerful AI tools accessible to everyone, regardless of technical expertise.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const milestones = [
    { year: '2021', event: 'Company founded with a vision to democratize AI-powered content tools' },
    { year: '2022', event: 'Launched our first AI Text Humanizer with 95% accuracy rate' },
    { year: '2023', event: 'Reached 10,000+ active users and expanded to 4 core services' },
    { year: '2024', event: 'Processed over 1 million documents and achieved 99.9% uptime' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80" 
            alt="Team collaboration" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl animate-fade-in">
              About <span className="text-blue-200">DocumentOptimizer</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to empower content creators, marketers, and professionals with intelligent AI tools that make writing better, faster, and more effective.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Mission Section with Image */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At DocumentOptimizer, we believe that great content should be accessible to everyone. Our AI-powered tools bridge the gap between human creativity and machine efficiency, helping you create content that resonates with your audience while maintaining authenticity and quality.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're a content creator looking to humanize AI-generated text, a marketer optimizing for SEO, or a professional improving document readability, our suite of tools is designed to enhance your workflow and amplify your impact.
              </p>
              <div className="flex items-center space-x-4 bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Powered by Advanced AI</h3>
                  <p className="text-gray-600">Cutting-edge machine learning models trained on millions of documents</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 mb-12 lg:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" 
                  alt="Team working together" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-xl max-w-xs">
                  <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">1M+</div>
                      <div className="text-blue-200 text-sm">Documents Processed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">10K+</div>
                      <div className="text-blue-200 text-sm">Active Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">99.9%</div>
                      <div className="text-blue-200 text-sm">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1">24/7</div>
                      <div className="text-blue-200 text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section with Background Image */}
      <div className="relative bg-blue-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80" 
            alt="Values background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we build products for our users.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of AI researchers, engineers, and product experts is passionate about making AI accessible to everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <img
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section with Images */}
      <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a trusted platform serving thousands of users worldwide.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"></div>
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 border-blue-500">
                      <div className="text-3xl font-bold text-blue-600 mb-3">{milestone.year}</div>
                      <p className="text-gray-700 text-lg leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Background Image */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80" 
            alt="CTA background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who trust DocumentOptimizer to enhance their content and streamline their workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/services"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-2xl"
            >
              Explore Our Services
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;