This is a simple application demonstrating basic CRUD operations for loans. Both the backend and frontend are built with Next.js.
Prisma is used for database generation, while Docker is used to automatically spin up a PostgreSQL database instance along with the application.

## Clear Docker Cache & Rebuild

```bash

# Stop running containers
docker-compose down --volumes --remove-orphans

# Remove volumes and cache
docker-compose rm -v
docker system prune -a --volumes


# Build & Start Again
docker-compose up --build

```

## How This Works ✅

1.  The postgresql database container starts first.
2.  Next.js container will wait until Postgres is up (depends_on).
3.  Prisma migrations will automatically run inside the Next.js container.
4.  Next.js app will build and serve on http://localhost:3000.
