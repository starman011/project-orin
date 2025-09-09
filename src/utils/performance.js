// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      scrollLatency: [],
      renderTime: [],
      componentLoadTime: new Map(),
    };
    this.isMonitoring = process.env.NODE_ENV === 'development';
  }

  measureScrollLatency(startTime) {
    if (!this.isMonitoring) return;
    const latency = performance.now() - startTime;
    this.metrics.scrollLatency.push(latency);
    
    // Keep only last 50 measurements
    if (this.metrics.scrollLatency.length > 50) {
      this.metrics.scrollLatency.shift();
    }

    // Log if latency is concerning
    if (latency > 100) {
      console.warn(`High scroll latency detected: ${latency.toFixed(2)}ms`);
    }
  }

  measureComponentLoad(componentName, startTime) {
    if (!this.isMonitoring) return;
    const loadTime = performance.now() - startTime;
    this.metrics.componentLoadTime.set(componentName, loadTime);
    
    if (loadTime > 200) {
      console.warn(`Slow component load: ${componentName} took ${loadTime.toFixed(2)}ms`);
    }
  }

  measureRender(renderTime) {
    if (!this.isMonitoring) return;
    this.metrics.renderTime.push(renderTime);
    
    // Keep only last 100 measurements
    if (this.metrics.renderTime.length > 100) {
      this.metrics.renderTime.shift();
    }
  }

  getAverageScrollLatency() {
    const latencies = this.metrics.scrollLatency;
    if (latencies.length === 0) return 0;
    return latencies.reduce((a, b) => a + b, 0) / latencies.length;
  }

  getMetrics() {
    return {
      avgScrollLatency: this.getAverageScrollLatency(),
      componentLoadTimes: Object.fromEntries(this.metrics.componentLoadTime),
      avgRenderTime: this.metrics.renderTime.length > 0 
        ? this.metrics.renderTime.reduce((a, b) => a + b, 0) / this.metrics.renderTime.length 
        : 0,
      totalMeasurements: {
        scroll: this.metrics.scrollLatency.length,
        render: this.metrics.renderTime.length,
        components: this.metrics.componentLoadTime.size,
      }
    };
  }

  logMetrics() {
    if (!this.isMonitoring) return;
    console.group('Performance Metrics');
    const metrics = this.getMetrics();
    console.log('Average Scroll Latency:', metrics.avgScrollLatency.toFixed(2) + 'ms');
    console.log('Average Render Time:', metrics.avgRenderTime.toFixed(2) + 'ms');
    console.log('Component Load Times:', metrics.componentLoadTimes);
    console.log('Total Measurements:', metrics.totalMeasurements);
    console.groupEnd();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Performance optimization utilities
export const optimizeImage = (src) => {
  // For future implementation: WebP conversion, lazy loading
  return src;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (performance.memory) {
    const memory = performance.memory;
    console.log({
      usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
      totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
      jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
    });
  }
};