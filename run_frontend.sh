#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/frontend"

echo "Starting Moveo.AI frontend (React + Vite) on http://localhost:5173"
npm run dev
