import client from 'prom-client'

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom counter
export const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

export const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["route", "method", "status"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 3, 5],
});