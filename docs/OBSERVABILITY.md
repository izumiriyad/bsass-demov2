# Observability Plan

## Client telemetry

The frontend sends:

- Web Vitals to `/api/analytics/web-vitals`
- client errors to `/api/client-events`
- unhandled promise rejections to `/api/client-events`

Wire these endpoints to Sentry, Datadog, Grafana Loki, OpenTelemetry Collector, or a custom backend.

## Synthetic monitoring

Reference checks:

- `ops/monitoring/uptime-checks.json`
- `ops/monitoring/prometheus-rules.yml`

## Recommended SLOs

- Availability: 99.9%
- p95 document response: < 1.5s in Bangladesh/India/Singapore
- JS error rate: < 0.5% sessions
- Core Web Vitals: 75%+ good LCP/INP/CLS
