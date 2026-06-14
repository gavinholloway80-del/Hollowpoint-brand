#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "Starting Hollowpoint Beauty website..."
echo "Open: http://localhost:${PORT}"
echo "Press Ctrl+C to stop."

cd "$ROOT"
python3 -m http.server "$PORT"
