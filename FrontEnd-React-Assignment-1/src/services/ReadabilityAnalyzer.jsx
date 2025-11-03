import React, { useState } from 'react';

const ReadabilityAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      // Simulate analysis
      setTimeout(() => {
        const words = inputText.split(/\s+/).filter(w => w.trim()).length;
        const sentences = inputText.split(/[.!?]+/).filter(s => s.trim()).length;
        const avgWordsPerSentence = sentences > 0 ? Math.round(words / sentences) : 0;
        const readabilityScore = Math.max(0, Math.min(100, 100 - (avgWordsPerSentence * 2)));
        
        setAnalysis({
          words,
          sentences,
          avgWordsPerSentence,
          readabilityScore,
          grade: getGradeLevel(readabilityScore),
          suggestions: getSuggestions(readabilityScore, avgWordsPerSentence)
        });
        setIsAnalyzing(false);
      }, 1500);
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const getGradeLevel = (score) => {
    if (score >= 90) return 'Very Easy (5th grade)';
    if (score >= 80) return 'Easy (6th grade)';
    if (score >= 70) return 'Fairly Easy (7th grade)';
    if (score >= 60) return 'Standard (8th-9th grade)';
    if (score >= 50) return 'Fairly Difficult (10th-12th grade)';
    if (score >= 30) return 'Difficult (College level)';
    return 'Very Difficult (Graduate level)';
  };

  const getSuggestions = (score, avgWords) => {
    const suggestions = [];
    if (score < 60) {
      suggestions.push('Consider using shorter sentences to improve readability');
      suggestions.push('Replace complex words with simpler alternatives');
    }
    if (avgWords > 20) {
      suggestions.push('Break down long sentences into shorter ones');
    }
    if (score >= 80) {
      suggestions.push('Great job! Your text is very readable');
    }
    return suggestions;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Readability <span className="text-primary-600">Analyzer</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze and improve your content's readability score for better audience engagement and comprehension.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Text to Analyze</h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here for readability analysis..."
              className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
              <button
                onClick={analyzeText}
                disabled={!inputText.trim() || isAnalyzing}
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-700 text-blue-600 rounded-lg font-medium hover:from-primary-600 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <>
                {/* Readability Score */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Readability Score</h3>
                  <div className={`text-center p-6 rounded-lg ${getScoreBg(analysis.readabilityScore)}`}>
                    <div className={`text-4xl font-bold ${getScoreColor(analysis.readabilityScore)}`}>
                      {analysis.readabilityScore}
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {analysis.grade}
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Text Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-semibold">{analysis.words}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sentences:</span>
                      <span className="font-semibold">{analysis.sentences}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Words/Sentence:</span>
                      <span className="font-semibold">{analysis.avgWordsPerSentence}</span>
                    </div>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions</h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                <p className="text-gray-500 italic">Enter text and click "Analyze Text" to see readability metrics and suggestions.</p>
              </div>
            )}
          </div>
        </div>

        {/* Readability Scale */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Readability Scale</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">80-100</div>
              <div className="text-sm font-semibold text-green-800 mb-1">Very Easy</div>
              <div className="text-xs text-green-600">5th-6th grade level</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-2">60-79</div>
              <div className="text-sm font-semibold text-yellow-800 mb-1">Standard</div>
              <div className="text-xs text-yellow-600">7th-9th grade level</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600 mb-2">0-59</div>
              <div className="text-sm font-semibold text-red-800 mb-1">Difficult</div>
              <div className="text-xs text-red-600">College+ level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadabilityAnalyzer;