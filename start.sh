#!/bin/bash

# ==============================================================================
# BALI TECHSOLUTION - SMART PORT FINDER (ZERO-CONFLICT)
# ==============================================================================

# Definisikan port awal pencarian
APP_PORT_START=8000
VITE_PORT_START=5173
DB_PORT_START=5432
REDIS_PORT_START=6380

# Fungsi untuk mengecek apakah port sedang dipakai (Linux/macOS)
is_port_busy() {
    local port=$1
    if command -v lsof >/dev/null 2>&1; then
        lsof -i :$port -sTCP:LISTEN -t >/dev/null && return 0 || return 1
    elif command -v netstat >/dev/null 2>&1; then
        netstat -tuln | grep -q ":$port " && return 0 || return 1
    else
        # Fallback to bash tcp check if available
        (echo >/dev/tcp/localhost/$port) &>/dev/null && return 0 || return 1
    fi
}

# Fungsi untuk mencari port kosong tercepat
find_free_port() {
    local port=$1
    while is_port_busy $port; do
        port=$((port + 1))
    done
    echo $port
}

# Setup .env jika belum ada
if [ ! -f .env ]; then
    echo "📄 File .env belum ada, membuat dari .env.example..."
    cp .env.example .env
fi

echo "🔍 Mendeteksi ketersediaan port di laptop Anda..."

# Cari port kosong secara dinamis
export APP_PORT=$(find_free_port $APP_PORT_START)
export VITE_PORT=$(find_free_port $VITE_PORT_START)
export DB_PORT=$(find_free_port $DB_PORT_START)
export REDIS_PORT=$(find_free_port $REDIS_PORT_START)

# Simpan/Update secara permanen di file .env agar sinkron dengan Docker
update_env_var() {
    local var_name=$1
    local var_value=$2
    if grep -q "^$var_name=" .env; then
        # Update nilai yang sudah ada (Sed portable)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s/^$var_name=.*/$var_name=$var_value/" .env
        else
            sed -i "s/^$var_name=.*/$var_name=$var_value/" .env
        fi
    else
        # Tambah baru di baris awal
        echo "$var_name=$var_value" >> .env
    fi
}

update_env_var "APP_PORT" "$APP_PORT"
update_env_var "VITE_PORT" "$VITE_PORT"
update_env_var "DB_PORT" "$DB_PORT"
update_env_var "REDIS_PORT" "$REDIS_PORT"

echo "✅ Port dikonfigurasi otomatis di .env:"
echo "   - [WEB] http://localhost:$APP_PORT"
echo "   - [DB]  Port: $DB_PORT"
echo ""

echo "🚀 Memulai Docker Compose..."
docker compose up -d

echo ""
echo "=========================================================================="
echo "          BALI TECHSOLUTION - TEMPLATE HAS BEEN DEPLOYED!           "
echo "=========================================================================="
echo "🌍 Akses Aplikasi: http://localhost:$APP_PORT"
echo "🔐 Admin Login:   admin@admin.com / password"
echo "=========================================================================="
