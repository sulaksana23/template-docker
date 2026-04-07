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

run_migrations_with_recovery() {
  local attempts="${1:-30}"
  local sleep_seconds="${2:-2}"

  for attempt in $(seq 1 "${attempts}"); do
    local output
    if output="$(php artisan migrate --force 2>&1)"; then
      echo "${output}"
      return 0
    fi

    echo "${output}"

    if echo "${output}" | grep -Eqi "Duplicate table|already exists|relation \".+\" already exists"; then
      echo "=== Duplicate migration artifacts detected, running migrate:fresh for clean bootstrap ==="
      php artisan migrate:fresh --force
      return 0
    fi

    echo "Command 'php artisan migrate --force' failed (${attempt}/${attempts}), retrying in ${sleep_seconds}s..."
    sleep "${sleep_seconds}"
  done

  echo "Command 'php artisan migrate --force' failed after ${attempts} attempts."
  return 1
}

ensure_composer_dependencies() {
  if [ ! -f composer.json ]; then
    return 0
  fi

  if [ ! -f vendor/autoload.php ]; then
    echo "=== vendor/autoload.php missing, running composer install ==="
    composer install --no-interaction --prefer-dist
  fi
}

composer_package_installed() {
  local package="$1"

  if [ ! -f vendor/autoload.php ]; then
    return 1
  fi

  composer show "${package}" --no-interaction >/dev/null 2>&1
}

activitylog_trait_available() {
  if [ ! -f vendor/autoload.php ]; then
    return 1
  fi

  php -r "require 'vendor/autoload.php'; exit(trait_exists('Spatie\\\\Activitylog\\\\Traits\\\\LogsActivity') ? 0 : 1);"
}

ensure_spatie_packages() {
  ensure_composer_dependencies

  if ! composer_package_installed "spatie/laravel-permission"; then
    echo "=== Missing spatie/laravel-permission, installing ==="
    composer require spatie/laravel-permission --no-interaction
    php artisan vendor:publish --provider='Spatie\Permission\PermissionServiceProvider' --force || true
  fi

  if ! composer_package_installed "spatie/laravel-activitylog"; then
    echo "=== Missing spatie/laravel-activitylog, installing ==="
    composer require spatie/laravel-activitylog --no-interaction
    php artisan vendor:publish --provider='Spatie\Activitylog\ActivitylogServiceProvider' --tag='activitylog-migrations' --force || true
  fi

  # Refresh autoloader and clear caches so newly installed traits are always available.
  composer dump-autoload -o --no-interaction >/dev/null
  php artisan optimize:clear >/dev/null || true

  # Safety net: package may be installed but trait still not loadable due stale autoload/cache.
  if ! activitylog_trait_available; then
    echo "=== Activitylog trait not loadable, forcing reinstall + autoload refresh ==="
    composer require spatie/laravel-activitylog --no-interaction
    composer dump-autoload -o --no-interaction >/dev/null
    php artisan optimize:clear >/dev/null || true
  fi
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
  ensure_spatie_packages
  run_migrations_with_recovery 30 2
  retry_artisan "db:seed --force" 10 2
else
  echo "=== Laravel already installed, skipping bootstrap ==="
fi

# Self-heal when bootstrap was partial and required packages are missing.
if [ -f artisan ]; then
  ensure_spatie_packages
fi

echo "=== Starting FrankenPHP ==="
exec frankenphp run --config /etc/caddy/Caddyfile --adapter caddyfile
