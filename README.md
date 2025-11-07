# Elysia with Bun runtime

## Development
To start the development server run:
```bash
bun run dev
```

```bash
docker build -t bun-server .
docker run -d `
  --name bun-server `
  -p 8000:8000 `
  bun-server
```

```bash
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v $(pwd)/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
  -v $(pwd)/prometheus/alerts.yml:/etc/prometheus/alerts.yml \
  prom/prometheus
```

```powershell
docker run -d `
  --name prometheus `
  -p 9090:9090 `
  -v ${PWD}\prometheus\prometheus.yml:/etc/prometheus/prometheus.yml `
  -v ${PWD}\prometheus\alerts.yml:/etc/prometheus/alerts.yml `
  prom/prometheus
```