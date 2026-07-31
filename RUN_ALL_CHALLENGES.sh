#!/usr/bin/env bash
set -e
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Moveo.AI Challenges Master Launcher"
echo "1) Frontend (React + Vite)"
echo "2) Backend REST API"
echo "3) Backend Kafka Analytics"
echo "4) Solutions Engineer Gateway"
echo "5) Run all available services sequentially"

echo
read -r -p "Select an option [1-5]: " selection
case "$selection" in
  1)
    "$BASE_DIR/run_frontend.sh"
    ;;
  2)
    "$BASE_DIR/run_backend_rest.sh"
    ;;
  3)
    "$BASE_DIR/run_backend_kafka.sh"
    ;;
  4)
    "$BASE_DIR/run_solutions_engineer.sh"
    ;;
  5)
    "$BASE_DIR/run_frontend.sh" &
    "$BASE_DIR/run_backend_rest.sh" &
    "$BASE_DIR/run_backend_kafka.sh" &
    "$BASE_DIR/run_solutions_engineer.sh" &
    wait
    ;;
  *)
    echo "Invalid option. Exiting."
    exit 1
    ;;
esac
