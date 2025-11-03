import React, { useState } from 'react';

const AIHumanizer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleHumanize = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const humanized = inputText
          .replace(/\bAI\b/g, 'artificial intelligence')
          .replace(/\bgenerated\b/g, 'created');
        setOutputText(`Humanized version: ${humanized}`);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('Humanization failed:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            AI Text <span className="text-primary-600">Humanizer</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Transform AI-generated content into natural, human-like text that bypasses detection algorithms and engages your audience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Text</h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={handleHumanize}
                disabled={!inputText.trim() || isProcessing}
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-blue-600 rounded-lg font-medium hover:from-primary-600 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isProcessing ? 'Processing...' : 'Humanize Text'}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Humanized Text</h3>
            <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
              {outputText ? (
                <p className="text-gray-800">{outputText}</p>
              ) : (
                <p className="text-gray-500 italic">Your humanized text will appear here...</p>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {outputText.length} characters
              </span>
              {outputText && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(outputText)
                      .catch((err) => {
                        console.error('Failed to copy text:', err);
                        alert('Failed to copy text to clipboard.');
                      });
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Copy Text
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bypass Detection</h3>
            <p className="text-gray-600">Advanced algorithms to make AI text undetectable by AI detection tools.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Process your content in seconds with our optimized AI models.</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your content is processed securely and never stored on our servers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHumanizer;