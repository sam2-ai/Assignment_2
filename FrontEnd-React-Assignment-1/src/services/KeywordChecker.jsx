import React, { useState } from 'react';

const KeywordChecker = () => {
  const [inputText, setInputText] = useState('');
  const [targetKeywords, setTargetKeywords] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeKeywords = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate analysis
      setTimeout(() => {
        const words = inputText.toLowerCase().split(/\s+/).filter(w => w);
        const totalWords = words.length;
        const keywords = targetKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
        
        const keywordAnalysis = keywords.map(keyword => {
          const occurrences = words.filter(word => word.includes(keyword)).length;
          const density = totalWords > 0 ? ((occurrences / totalWords) * 100).toFixed(2) : '0.00';
          return {
            keyword,
            occurrences,
            density: parseFloat(density),
            status: getDensityStatus(parseFloat(density))
          };
        });

      // Word frequency analysis
      const wordFreq = {};
      words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (cleanWord.length > 3) {
          wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
        }
      });

      const topWords = Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({
          word,
          count,
          density: ((count / totalWords) * 100).toFixed(2)
        }));

        setAnalysis({
          totalWords,
          keywordAnalysis,
          topWords,
          recommendations: getRecommendations(keywordAnalysis)
        });
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const getDensityStatus = (density) => {
    if (density === 0) return 'missing';
    if (density < 1) return 'low';
    if (density <= 3) return 'optimal';
    return 'high';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      case 'missing': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-100';
      case 'low': return 'bg-yellow-100';
      case 'high': return 'bg-red-100';
      case 'missing': return 'bg-gray-100';
      default: return 'bg-gray-100';
    }
  };

  const getRecommendations = (keywordAnalysis) => {
    const recommendations = [];
    keywordAnalysis.forEach(({ keyword, density, status }) => {
      if (status === 'missing') {
        recommendations.push(`Add "${keyword}" to your content`);
      } else if (status === 'low') {
        recommendations.push(`Increase usage of "${keyword}" (currently ${density}%)`);
      } else if (status === 'high') {
        recommendations.push(`Reduce usage of "${keyword}" to avoid keyword stuffing (currently ${density}%)`);
      }
    });
    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Keyword Density <span className="text-primary-600">Checker</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Optimize your content for SEO with comprehensive keyword analysis and density checking tools.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Keywords</h3>
              <input
                type="text"
                value={targetKeywords}
                onChange={(e) => setTargetKeywords(e.target.value)}
                placeholder="Enter keywords separated by commas (e.g., SEO, content marketing, optimization)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-2">Separate multiple keywords with commas</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content to Analyze</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your content here for keyword density analysis..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {inputText.split(/\s+/).filter(w => w).length} words
                </span>
                <button
                  onClick={analyzeKeywords}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-blue-600 rounded-lg font-medium hover:from-primary-600 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Keywords'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Keyword Analysis */}
                {analysis.keywordAnalysis.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Keywords Analysis</h3>
                    <div className="space-y-3">
                      {analysis.keywordAnalysis.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg ${getStatusBg(item.status)}`}>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-900 capitalize">{item.keyword}</span>
                            <span className={`font-semibold ${getStatusColor(item.status)}`}>
                              {item.density}%
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.occurrences} occurrences • {item.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Words */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Frequent Words</h3>
                  <div className="space-y-2">
                    {analysis.topWords.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="font-medium text-gray-900">{item.word}</span>
                        <div className="text-right">
                          <span className="text-primary-600 font-semibold">{item.density}%</span>
                          <span className="text-gray-500 text-sm ml-2">({item.count})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {analysis.recommendations.length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                <p className="text-gray-500 italic">Enter your content and target keywords, then click "Analyze Keywords" to see detailed keyword density analysis.</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Guidelines */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">SEO Keyword Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">1-3%</div>
              <div className="text-sm font-semibold text-green-800 mb-1">Optimal Density</div>
              <div className="text-xs text-green-600">Perfect for SEO ranking</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">0.5-1%</div>
              <div className="text-sm font-semibold text-yellow-800 mb-1">Low Density</div>
              <div className="text-xs text-yellow-600">Consider increasing usage</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">3%+</div>
              <div className="text-sm font-semibold text-red-800 mb-1">High Density</div>
              <div className="text-xs text-red-600">Risk of keyword stuffing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordChecker;