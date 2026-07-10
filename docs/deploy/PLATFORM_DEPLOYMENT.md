# Platform Deployment Guide

## Required build validation

Always run before deployment:

```bash
npm ci
npm run validate:production
```

## Standalone Node / VPS

```bash
npm ci
npm run build
PORT=3000 npm run start
```

Use `ops/nginx.conf` as the reverse proxy reference.

## Docker

```bash
docker build -t bsl-gaming:latest .
docker run -p 3000:3000 --env NODE_ENV=production bsl-gaming:latest
```

## Docker Compose

```bash
docker compose up --build
```

## Kubernetes

```bash
kubectl apply -f k8s/bsl-gaming.yaml
```

## Vercel / Render / Railway / Fly

Config files are included:

- `vercel.json`
- `render.yaml`
- `railway.json`
- `fly.toml`

## Health endpoints

- `/api/health`
- `/api/readiness`
- `/api/version`
