import client from 'prom-client'

client.collectDefaultMetrics()

// Custom counter
export const httpRequests = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'path']
})
