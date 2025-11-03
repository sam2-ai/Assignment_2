import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaRobot, 
  FaUser, 
  FaSpinner, 
  FaCopy, 
  FaDownload,
  FaMagic,
  FaCheckCircle
} from 'react-icons/fa';

const AIHumanizer = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [humanizationLevel, setHumanizationLevel] = useState('balanced');

  const humanizationOptions = [
    { value: 'conservative', label: 'Conservative', description: 'Minimal changes, preserve original tone' },
    { value: 'balanced', label: 'Balanced', description: 'Good balance of human-like and original content' },
    { value: 'aggressive', label: 'Aggressive', description: 'Maximum humanization, natural flow' }
  ];

  const handleHumanize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to humanize');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate AI humanization process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock humanization result
      const humanizedText = `${inputText}\n\n[Humanized with ${humanizationLevel} settings - This is a demo output. In a real implementation, this would be processed by an AI humanization service.]`;
      
      setOutputText(humanizedText);
      toast.success('Text successfully humanized! 🎉');
    } catch (error) {
      toast.error('Failed to humanize text. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    toast.success('Copied to clipboard! 📋');
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([outputText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'humanized-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('File downloaded! 📥');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FaRobot className="text-4xl text-purple-600 mr-3" />
            <FaUser className="text-4xl text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Text Humanizer 🤖➡️👤
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform AI-generated content into natural, human-like text that bypasses AI detection
          </p>
        </motion.div>

        {/* Humanization Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaMagic className="mr-2 text-purple-600" />
            Humanization Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {humanizationOptions.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  humanizationLevel === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setHumanizationLevel(option.value)}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    humanizationLevel === option.value ? 'bg-purple-500' : 'bg-gray-300'
                  }`} />
                  <h4 className="font-medium text-gray-900">{option.label}</h4>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaRobot className="mr-2 text-red-500" />
              AI-Generated Text
            </h3>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your AI-generated text here..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                {inputText.length} characters
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleHumanize}
                disabled={isProcessing || !inputText.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Humanizing...
                  </>
                ) : (
                  <>
                    <FaMagic className="mr-2" />
                    Humanize Text
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FaUser className="mr-2 text-green-500" />
              Humanized Text
              {outputText && <FaCheckCircle className="ml-2 text-green-500" />}
            </h3>
            <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
              {outputText ? (
                <p className="text-gray-800 whitespace-pre-wrap">{outputText}</p>
              ) : (
                <p className="text-gray-400 italic">
                  Your humanized text will appear here...
                </p>
              )}
            </div>
            {outputText && (
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500">
                  {outputText.length} characters
                </span>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <FaCopy className="mr-2" />
                    Copy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadText}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use Our AI Humanizer? 🌟
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-2xl text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bypass AI Detection</h4>
              <p className="text-gray-600">Advanced algorithms to make text undetectable by AI checkers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUser className="text-2xl text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Natural Flow</h4>
              <p className="text-gray-600">Maintains readability while adding human-like variations</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMagic className="text-2xl text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Preserve Meaning</h4>
              <p className="text-gray-600">Keeps original context and message intact</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIHumanizer;