import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getHealth } from '../services/api';

const HealthBadge = () => {
  const [health, setHealth] = useState({
    status: 'checking',
    services: {
      server: { status: 'unknown' },
      database: { status: 'unknown' }
    }
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await getHealth();
        setHealth(data);
      } catch (error) {
        setHealth({
          status: 'unhealthy',
          services: {
            server: { status: 'unhealthy', message: 'Connection failed' },
            database: { status: 'unknown', message: 'Unable to check' }
          }
        });
      }
    };

    // Check immediately
    checkHealth();

    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'unhealthy': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return '✅';
      case 'unhealthy': return '❌';
      case 'checking': return '⏳';
      default: return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
          health.status === 'healthy' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : health.status === 'unhealthy'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}
      >
        <div className={`w-3 h-3 rounded-full ${getStatusColor(health.status)} animate-pulse`} />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium">System Health</div>
          <div className="text-xs opacity-75 capitalize">{health.status}</div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ⌄
        </motion.div>
      </motion.button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🖥️ Server</span>
              <div className="flex items-center gap-2">
                <span>{getStatusIcon(health.services?.server?.status)}</span>
                <span className="capitalize text-xs">{health.services?.server?.status}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">🗄️ Database</span>
              <div className="flex items-center gap-2">
                <span>{getStatusIcon(health.services?.database?.status)}</span>
                <span className="capitalize text-xs">{health.services?.database?.status}</span>
              </div>
            </div>
            {health.system && (
              <div className="pt-2 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Uptime: {Math.floor(health.system.uptime / 60)}m
                </div>
                <div className="text-xs text-gray-500">
                  Memory: {health.system.memory?.usagePercent?.toFixed(1)}%
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HealthBadge;