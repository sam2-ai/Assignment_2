import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import AIHumanizer from './services/AIHumanizer';
import PromptOptimizer from './services/PromptOptimizer';
import ReadabilityAnalyzer from './services/ReadabilityAnalyzer';
import KeywordChecker from './services/KeywordChecker';

function App() {
  useEffect(() => {
    // lightweight health check on app mount
    import('./services/backend')
      .then(({ getHealth }) => getHealth())
      .then((status) => console.log('backend health', status))
      .catch((err) => console.error('health check failed', err));
  }, []);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/humanizer" element={<AIHumanizer />} />
          <Route path="/services/prompt-optimizer" element={<PromptOptimizer />} />
          <Route path="/services/readability" element={<ReadabilityAnalyzer />} />
          <Route path="/services/keyword-checker" element={<KeywordChecker />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
