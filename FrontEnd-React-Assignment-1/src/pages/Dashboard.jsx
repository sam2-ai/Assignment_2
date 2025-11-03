import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import HealthBadge from '../components/HealthBadge';

// Mock data for charts
const uploadTrendData = [
  { month: 'Jan', uploads: 12, storage: 2.4 },
  { month: 'Feb', uploads: 19, storage: 3.8 },
  { month: 'Mar', uploads: 15, storage: 3.2 },
  { month: 'Apr', uploads: 25, storage: 5.1 },
  { month: 'May', uploads: 22, storage: 4.8 },
  { month: 'Jun', uploads: 30, storage: 6.2 }
];

const documentTypeData = [
  { name: 'PDFs', value: 45, color: '#3B82F6' },
  { name: 'Images', value: 30, color: '#10B981' },
  { name: 'Documents', value: 15, color: '#F59E0B' },
  { name: 'Others', value: 10, color: '#EF4444' }
];

const activityData = [
  { time: '00:00', activity: 2 },
  { time: '04:00', activity: 1 },
  { time: '08:00', activity: 8 },
  { time: '12:00', activity: 15 },
  { time: '16:00', activity: 12 },
  { time: '20:00', activity: 6 }
];

const recentDocs = [
  { 
    id: 1,
    title: '📄 Financial Report Q3 2024', 
    meta: 'Uploaded 2 hours ago', 
    status: 'Processing',
    type: 'PDF',
    size: '2.4 MB',
    icon: '📊'
  },
  { 
    id: 2,
    title: '🏠 Property Insurance Policy', 
    meta: 'Uploaded 1 day ago', 
    status: 'Active',
    type: 'PDF',
    size: '1.8 MB',
    icon: '🏡'
  },
  { 
    id: 3,
    title: '🚗 Vehicle Registration', 
    meta: 'Uploaded 3 days ago', 
    status: 'Active',
    type: 'Image',
    size: '856 KB',
    icon: '🚙'
  },
  { 
    id: 4,
    title: '💼 Employment Contract', 
    meta: 'Uploaded 1 week ago', 
    status: 'Archived',
    type: 'DOCX',
    size: '324 KB',
    icon: '📝'
  }
];

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDocs: 0,
    storageUsed: 0,
    activeAlerts: 0,
    monthlyUploads: 0
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalDocs: 127 + Math.floor(Math.random() * 5),
        storageUsed: 15.8 + Math.random() * 2,
        activeAlerts: Math.floor(Math.random() * 3),
        monthlyUploads: 45 + Math.floor(Math.random() * 10)
      }));
    }, 5000);

    // Initial load
    setStats({
      totalDocs: 127,
      storageUsed: 15.8,
      activeAlerts: 2,
      monthlyUploads: 45
    });

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-yellow-600 bg-yellow-50';
      case 'Archived': return 'text-gray-600 bg-gray-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <motion.aside 
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6 min-h-screen pt-8 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
              📚
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">DocuFlow</div>
              <div className="text-xs text-gray-500">Professional Suite</div>
            </div>
          </div>

          <div className="mb-6">
            <HealthBadge />
          </div>

          <nav>
            <ul className="space-y-2">
              {[
                { icon: '📊', label: 'Dashboard', active: true },
                { icon: '📄', label: 'Documents' },
                { icon: '⬆️', label: 'Upload' },
                { icon: '📦', label: 'Bulk Upload' },
                { icon: '🔔', label: 'Alerts' },
                { icon: '📁', label: 'Folders' },
                { icon: '👤', label: 'Profile' },
                { icon: '⚙️', label: 'Settings' }
              ].map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.active ? "/dashboard" : "#"} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      item.active 
                        ? 'text-blue-700 bg-blue-50 shadow-sm border border-blue-100' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.aside>

        <div className="flex-1 relative">
          {/* Enhanced Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {user?.name || 'User'}! 👋
                  </h1>
                  <p className="text-gray-600 mt-1">Here's your document management overview</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block relative">
                  <input 
                    type="text" 
                    placeholder="🔍 Search documents..." 
                    className="border border-gray-200 rounded-xl py-3 px-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
                >
                  📤 Upload
                </motion.button>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
          </motion.header>

          <main className="max-w-7xl mx-auto px-6 py-8">
            {/* Stats Cards */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {[
                { 
                  label: 'Total Documents', 
                  value: stats.totalDocs, 
                  change: '+12%', 
                  icon: '📄',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  label: 'Storage Used', 
                  value: `${stats.storageUsed.toFixed(1)} GB`, 
                  change: '+2.1 GB', 
                  icon: '💾',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  label: 'Active Alerts', 
                  value: stats.activeAlerts, 
                  change: stats.activeAlerts > 0 ? 'Needs attention' : 'All clear', 
                  icon: '🔔',
                  color: 'from-yellow-500 to-orange-500'
                },
                { 
                  label: 'Monthly Uploads', 
                  value: stats.monthlyUploads, 
                  change: '+8 this week', 
                  icon: '⬆️',
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        <CountUp end={typeof stat.value === 'number' ? stat.value : 0} duration={2} />
                        {typeof stat.value === 'string' && !stat.value.includes('GB') ? stat.value : ''}
                        {stat.value.toString().includes('GB') ? ' GB' : ''}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Upload Trends */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  📈 Upload Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={uploadTrendData}>
                    <defs>
                      <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="uploads" 
                      stroke="#3B82F6" 
                      fillOpacity={1} 
                      fill="url(#colorUploads)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Document Types */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  📊 Document Types
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={documentTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {documentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Recent Documents & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Documents */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    📋 Recent Documents
                  </h3>
                  <Link to="#" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    View all →
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentDocs.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl shadow-lg">
                          {doc.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{doc.title}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-500">{doc.meta}</p>
                            <span className="text-xs text-gray-400">• {doc.size}</span>
                            <span className="text-xs text-gray-400">• {doc.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                          Open
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Activity Chart */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  ⚡ Daily Activity
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                      }} 
                    />
                    <Bar 
                      dataKey="activity" 
                      fill="url(#colorActivity)" 
                      radius={[4, 4, 0, 0]}
                    >
                      <defs>
                        <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <span className="text-sm font-medium text-blue-900">💡 Quick Tip</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Peak activity is between 12-16h. Consider scheduling bulk operations during off-peak hours.
                  </p>
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
