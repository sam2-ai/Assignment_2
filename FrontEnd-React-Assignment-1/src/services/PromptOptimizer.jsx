import React, { useState } from 'react';

const PromptOptimizer = () => {
  const [inputPrompt, setInputPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = [
    { value: 'general', label: 'General Purpose' },
    { value: 'creative', label: 'Creative Writing' },
    { value: 'technical', label: 'Technical Content' },
    { value: 'marketing', label: 'Marketing Copy' },
    { value: 'academic', label: 'Academic Writing' },
  ];

  const handleOptimize = () => {
    if (!inputPrompt.trim()) return;
    
    setIsProcessing(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const optimized = `Optimized ${selectedCategory} prompt: "${inputPrompt}" - Enhanced with specific instructions, context, and formatting guidelines for better AI responses.`;
        setOptimizedPrompt(optimized);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Optimization failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Prompt <span className="text-primary-600">Optimizer</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Enhance your AI prompts for better results with our intelligent prompt refinement and optimization tools.
          </p>
        </div>

        <div className="mt-12">
          {/* Category Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Prompt Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedCategory === category.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 text-gray-700'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Prompt</h3>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Enter your AI prompt here..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {inputPrompt.length} characters
                </span>
                <button
                  onClick={handleOptimize}
                  disabled={!inputPrompt.trim() || isProcessing}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-blue-600 rounded-lg font-medium hover:from-primary-600 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isProcessing ? 'Optimizing...' : 'Optimize Prompt'}
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimized Prompt</h3>
              <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                {optimizedPrompt ? (
                  <p className="text-gray-800">{optimizedPrompt}</p>
                ) : (
                  <p className="text-gray-500 italic">Your optimized prompt will appear here...</p>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {optimizedPrompt.length} characters
                </span>
                {optimizedPrompt && (
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(optimizedPrompt);
                        alert('Prompt copied to clipboard!');
                      } catch (err) {
                        alert('Failed to copy prompt. Please try again.');
                        console.error('Clipboard copy failed:', err);
                      }
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Copy Prompt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Prompt Optimization Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-primary-600 mb-3">Be Specific</h4>
              <p className="text-gray-600 mb-4">Provide clear, detailed instructions about what you want the AI to do.</p>
              
              <h4 className="text-lg font-semibold text-primary-600 mb-3">Set Context</h4>
              <p className="text-gray-600 mb-4">Give the AI background information and context for better understanding.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-primary-600 mb-3">Define Format</h4>
              <p className="text-gray-600 mb-4">Specify the desired output format, length, and structure.</p>
              
              <h4 className="text-lg font-semibold text-primary-600 mb-3">Use Examples</h4>
              <p className="text-gray-600 mb-4">Include examples of the type of response you're looking for.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptOptimizer;