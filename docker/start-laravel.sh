#!/usr/bin/env bash

set -Eeuo pipefail

set_env() {
  local key="$1"
  local value="$2"

  if grep -q "^${key}=" .env; then
    sed -i "s#^${key}=.*#${key}=${value}#g" .env
  else
    echo "${key}=${value}" >> .env
  fi
}

retry_artisan() {
  local command="$1"
  local attempts="${2:-20}"
  local sleep_seconds="${3:-3}"

  for attempt in $(seq 1 "${attempts}"); do
    if php artisan ${command}; then
      return 0
    fi

    echo "Command 'php artisan ${command}' failed (${attempt}/${attempts}), retrying in ${sleep_seconds}s..."
    sleep "${sleep_seconds}"
  done

  echo "Command 'php artisan ${command}' failed after ${attempts} attempts."
  return 1
}

echo "=== Laravel bootstrap starting ==="

if [ ! -f artisan ]; then
  echo "=== 1. Download Laravel project ==="
  curl -fsSL https://github.com/laravel/laravel/archive/refs/heads/master.tar.gz | tar xz --strip-components=1
  composer install --no-interaction --prefer-dist

  echo "=== 2. Configure environment ==="
  if [ ! -f .env ]; then
    cp .env.example .env
  fi
  php artisan key:generate --force

  set_env DB_CONNECTION pgsql
  set_env DB_HOST db
  set_env DB_PORT 5432
  set_env DB_DATABASE "${DB_DATABASE:-laravel}"
  set_env DB_USERNAME "${DB_USERNAME:-root}"
  set_env DB_PASSWORD "${DB_PASSWORD:-root}"
  set_env CACHE_STORE redis
  set_env REDIS_HOST redis

  echo "=== 3. Install Breeze and Spatie packages ==="
  composer require laravel/breeze --dev --no-interaction
  composer require spatie/laravel-permission spatie/laravel-activitylog --no-interaction
  php artisan breeze:install react -n

  echo "=== 4. Publish package assets ==="
  php artisan vendor:publish --provider='Spatie\Permission\PermissionServiceProvider' --force
  php artisan vendor:publish --provider='Spatie\Activitylog\ActivitylogServiceProvider' --tag='activitylog-migrations' --force

  if [ -d template ]; then
    echo "=== 5. Apply template files ==="
    cp -R template/. ./
  fi

  echo "=== 6. Build frontend assets ==="
  npm install --legacy-peer-deps
  npm run build

  echo "=== 7. Run database migrations and seeders ==="
  retry_artisan "migrate --force" 30 2
  retry_artisan "db:seed --force" 10 2
else
  echo "=== Laravel already installed, skipping bootstrap ==="
fi

echo "=== Starting FrankenPHP ==="
exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
