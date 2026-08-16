#!/bin/bash

set -e

echo "🚀 Starting build pipeline..."

ROOT_DIR=$(pwd)

# -------------------------
# 1. Load ENV file
# -------------------------
if [ -f "envCreator.txt" ]; then
  echo "📄 Loading envCreator.txt..."
  set -o allexport
  source <(sed 's/\r$//' envCreator.txt | sed '1s/^\xEF\xBB\xBF//')
  set +o allexport
else
  echo "❌ envCreator.txt not found!"
  exit 1
fi

# -------------------------
# 2. Preview ENV values
# -------------------------
echo ""
echo "================= 🔍 ENV PREVIEW ================="
echo ""

echo "📦 Webapp ENV:"
echo "----------------------------------"
echo "VITE_OIDC_ISSUER_URI=$VITE_OIDC_ISSUER_URI"
echo "VITE_OIDC_CLIENT_ID=$VITE_OIDC_CLIENT_ID"
echo "VITE_ADMIN_USERNAME=$VITE_ADMIN_USERNAME"
echo "VITE_ADMIN_API_URL=$VITE_ADMIN_API_URL"
echo "VITE_DATA_BACKEND_API_URL=$VITE_DATA_BACKEND_API_URL"
echo "VITE_OIDC_USE_MOCK=$VITE_OIDC_USE_MOCK"

echo ""
echo "🛠️ AdminAPI ENV:"
echo "----------------------------------"
echo "KEYCLOAK_BASE_URL=$KEYCLOAK_BASE_URL"
echo "REALM=$REALM"
echo "CLIENT_ID=$CLIENT_ID"
echo "CLIENT_SECRET=$CLIENT_SECRET"
echo "PORT=$PORT"
echo "WEBAPP_BASE_URL=$WEBAPP_BASE_URL"
echo "CLIENT_NAME=$CLIENT_NAME"

echo ""
echo "================================================="
echo ""

# -------------------------
# 3. Confirm
# -------------------------
read -p "👉 Proceed with build? (y/n): " confirm

if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "❌ Aborted by user."
  exit 0
fi

# -------------------------
# 4. Temp working dir
# -------------------------
WORK_DIR=$(mktemp -d)
echo "📁 Using temp dir: $WORK_DIR"

cd "$WORK_DIR"

# -------------------------
# 5. Clone Repositories (ONLY build ones)
# -------------------------
echo "📦 Cloning repos..."

git clone https://github.com/Prithvi1510/turbinewebapp.git Webapp
git clone https://github.com/Prithvi1510/adminApi.git Adminapi

# -------------------------
# 6. Inject ENV → Webapp (.env.production)
# -------------------------
echo "⚙️ Injecting Webapp env (.env.production)..."

cat <<EOF > Webapp/.env.production
VITE_OIDC_ISSUER_URI=$VITE_OIDC_ISSUER_URI
VITE_OIDC_CLIENT_ID=$VITE_OIDC_CLIENT_ID
VITE_ADMIN_USERNAME=$VITE_ADMIN_USERNAME
VITE_ADMIN_API_URL=$VITE_ADMIN_API_URL
VITE_DATA_BACKEND_API_URL=$VITE_DATA_BACKEND_API_URL
VITE_OIDC_USE_MOCK=$VITE_OIDC_USE_MOCK
EOF

# -------------------------
# 7. Build Webapp
# -------------------------
echo "🛠️ Building Webapp..."

cd Webapp
npm install
npm run build

echo "📦 Moving Webapp dist → ROOT"
rm -rf "$ROOT_DIR/Webapp"
mkdir -p "$ROOT_DIR/Webapp"
mv dist "$ROOT_DIR/Webapp/"
cd ..

# -------------------------
# 8. Inject ENV → AdminAPI (SAFE)
# -------------------------
echo "⚙️ Injecting AdminAPI env..."

# Fix if .env is a directory
if [ -d "Adminapi/.env" ]; then
  echo "⚠️ Found .env as directory → fixing..."
  rm -rf Adminapi/.env
fi

# Ensure it's a file
touch Adminapi/.env

cat <<EOF > Adminapi/.env
KEYCLOAK_BASE_URL=$KEYCLOAK_BASE_URL
REALM=$REALM
CLIENT_ID=$CLIENT_ID
CLIENT_SECRET=$CLIENT_SECRET
PORT=$PORT
WEBAPP_BASE_URL=$WEBAPP_BASE_URL
CLIENT_NAME=$CLIENT_NAME
EOF

# -------------------------
# 9. Build AdminAPI
# -------------------------
echo "🛠️ Building AdminAPI..."

cd Adminapi
npm install
npm run build

echo "📦 Moving AdminAPI dist → ROOT"
rm -rf "$ROOT_DIR/Adminapi"
mkdir -p "$ROOT_DIR/Adminapi"
mv dist "$ROOT_DIR/Adminapi/"
cd ..

# -------------------------
# 10. Simulator (SAFE handling)
# -------------------------
echo "🐍 Preparing Simulator..."

if [ -d "$ROOT_DIR/Simulator/.git" ]; then
  echo "🔄 Simulator exists → pulling latest..."
  cd "$ROOT_DIR/Simulator"
  git pull
  cd "$ROOT_DIR"
else
  echo "📦 Simulator not found → cloning..."
  git clone https://github.com/mkpremraj/SimulatorAPI.git "$ROOT_DIR/Simulator"
fi

# -------------------------
# 11. Cleanup
# -------------------------
echo "🧹 Cleaning up temp files..."
rm -rf "$WORK_DIR"

echo ""
echo "✅ DONE!"
echo ""
echo "📂 Final structure:"
echo " - Webapp/dist"
echo " - Adminapi/dist"
echo " - Simulator/"
