FROM dunglas/frankenphp

# Install system dependencies and Node.js
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions required by Laravel
# install-php-extensions is built into the frankenphp image
RUN install-php-extensions \
    pdo_pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    opcache \
    redis

# Optimasi PHP.ini untuk low-mem tapi fast (OPcache & JIT)
RUN cp $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini \
    && echo "opcache.enable=1" >> $PHP_INI_DIR/conf.d/docker-php-ext-opcache.ini \
    && echo "opcache.jit=tracing" >> $PHP_INI_DIR/conf.d/docker-php-ext-opcache.ini \
    && echo "opcache.jit_buffer_size=16M" >> $PHP_INI_DIR/conf.d/docker-php-ext-opcache.ini \
    && echo "memory_limit=128M" >> $PHP_INI_DIR/conf.d/custom.ini

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Setup Custom Host User to avoid Permission Denied on WSL/Linux
ARG USR=sulaksana60
ARG UID=1000
ARG GID=1000

RUN groupadd -f -g ${GID} ${USR} \
    && useradd -u ${UID} -g ${GID} -s /bin/bash -m ${USR} \
    && mkdir -p /data /config /app \
    && chown -R ${USR}:${GID} /data /config /app \
    && chmod -R 775 /data /config

USER ${USR}

WORKDIR /app
