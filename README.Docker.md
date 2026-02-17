# Docker Setup Guide

This guide explains how to run the Artist App using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+

## Quick Start (Development)

### 1. Build and start the application

```bash
docker-compose up --build
```

This will:
- Build the Rails API Docker image
- Start PostgreSQL database
- Run database migrations
- Start the Rails server on http://localhost:3000

### 2. Create the database (first time only)

The entrypoint automatically runs `rails db:prepare`, but if you need to manually create/migrate:

```bash
docker-compose exec api rails db:create
docker-compose exec api rails db:migrate
```

### 3. Access the application

- **API**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## Common Commands

### Start services in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# API only
docker-compose logs -f api

# Database only
docker-compose logs -f db
```

### Rails console
```bash
docker-compose exec api rails console
```

### Run migrations
```bash
docker-compose exec api rails db:migrate
```

### Seed database
```bash
docker-compose exec api rails db:seed
```

### Run tests
```bash
docker-compose exec api rails test
```

### Install new gems
```bash
# After adding to Gemfile
docker-compose exec api bundle install

# Or rebuild the container
docker-compose up --build
```

### Clean up everything (including volumes)
```bash
docker-compose down -v
```

## Production Deployment

### 1. Create production environment file

```bash
cp .env.example .env.production
```

Edit `.env.production` and set:
- `POSTGRES_PASSWORD` - Strong database password
- `RAILS_MASTER_KEY` - From `config/master.key`
- `SECRET_KEY_BASE` - Generate with `rails secret`

### 2. Build production image

```bash
docker-compose -f docker-compose.prod.yml build
```

### 3. Start production services

```bash
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d
```

### 4. Run production migrations

```bash
docker-compose -f docker-compose.prod.yml exec api rails db:migrate RAILS_ENV=production
```

## Development Workflow

### Code changes

The development setup uses volume mounts, so your code changes are immediately reflected. Just save your file and refresh!

For Gemfile changes:
```bash
docker-compose exec api bundle install
docker-compose restart api
```

### Database reset

```bash
docker-compose exec api rails db:reset
```

### Shell access

```bash
# Rails container
docker-compose exec api bash

# PostgreSQL
docker-compose exec db psql -U postgres -d api_development
```

## Troubleshooting

### Port already in use

If port 3000 or 5432 is already in use, modify `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Database connection issues

Ensure the database is healthy:
```bash
docker-compose ps
```

Check database logs:
```bash
docker-compose logs db
```

### Permission issues

If you encounter permission errors on Linux:
```bash
sudo chown -R $USER:$USER ./api
```

### Clean slate

Remove all containers, volumes, and start fresh:
```bash
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## Architecture

```
┌─────────────────────────────────────────────┐
│  Docker Host                                │
│                                             │
│  ┌────────────────┐     ┌────────────────┐ │
│  │  Rails API     │     │  PostgreSQL    │ │
│  │  (Port 3000)   │────▶│  (Port 5432)   │ │
│  │                │     │                │ │
│  └────────────────┘     └────────────────┘ │
│         │                       │          │
│         └───────────┬───────────┘          │
│                     │                      │
│            artist_app_network              │
└─────────────────────────────────────────────┘
```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_HOST` | PostgreSQL host | localhost | Yes |
| `DATABASE_USERNAME` | PostgreSQL user | postgres | Yes |
| `DATABASE_PASSWORD` | PostgreSQL password | postgres | Yes |
| `DATABASE_NAME` | Database name | api_development | Yes |
| `RAILS_ENV` | Rails environment | development | Yes |
| `RAILS_MASTER_KEY` | Rails master key | - | Production only |
| `SECRET_KEY_BASE` | Secret key base | - | Production only |

## Notes

- **Development**: Source code is mounted as a volume for hot-reload
- **Production**: Code is baked into the Docker image for better performance
- **Database**: PostgreSQL 17 Alpine for smaller image size
- **Security**: Production runs as non-root user
- **Caching**: Bundle cache is persisted in named volumes
