const mongoose = require('mongoose');
const os = require('os');

class HealthMonitor {
  constructor() {
    this.startTime = Date.now();
    this.healthChecks = {
      database: false,
      memory: true,
      disk: true,
      uptime: true
    };
  }

  // Get system health metrics
  getSystemMetrics() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

    return {
      uptime: process.uptime(),
      memory: {
        total: this.formatBytes(totalMemory),
        used: this.formatBytes(usedMemory),
        free: this.formatBytes(freeMemory),
        usagePercent: parseFloat(memoryUsagePercent)
      },
      cpu: {
        loadAverage: os.loadavg(),
        cores: os.cpus().length
      },
      platform: os.platform(),
      nodeVersion: process.version,
      pid: process.pid
    };
  }

  // Check database connectivity
  async checkDatabase() {
    try {
      const dbState = mongoose.connection.readyState;
      const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
      };

      if (dbState === 1) {
        // Test with a simple query
        await mongoose.connection.db.admin().ping();
        this.healthChecks.database = true;
        return {
          status: 'healthy',
          state: states[dbState],
          message: 'Database connection is active'
        };
      } else {
        this.healthChecks.database = false;
        return {
          status: 'unhealthy',
          state: states[dbState],
          message: 'Database connection is not active'
        };
      }
    } catch (error) {
      this.healthChecks.database = false;
      return {
        status: 'unhealthy',
        state: 'error',
        message: error.message
      };
    }
  }

  // Get overall health status
  async getHealthStatus() {
    const systemMetrics = this.getSystemMetrics();
    const databaseStatus = await this.checkDatabase();
    
    const isHealthy = this.healthChecks.database && 
                     systemMetrics.memory.usagePercent < 90;

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: systemMetrics.uptime,
      services: {
        database: {
          status: databaseStatus.status,
          state: databaseStatus.state,
          message: databaseStatus.message
        },
        server: {
          status: 'healthy',
          message: 'Server is running'
        }
      },
      system: systemMetrics,
      environment: process.env.NODE_ENV || 'development'
    };
  }

  // Format bytes to human readable format
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // Get detailed health report
  async getDetailedHealth() {
    const basicHealth = await this.getHealthStatus();
    
    return {
      ...basicHealth,
      details: {
        startTime: new Date(this.startTime).toISOString(),
        processId: process.pid,
        nodeVersion: process.version,
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        networkInterfaces: Object.keys(os.networkInterfaces()),
        environmentVariables: {
          NODE_ENV: process.env.NODE_ENV,
          PORT: process.env.PORT
        }
      }
    };
  }
}

module.exports = new HealthMonitor();