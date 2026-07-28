#!/usr/bin/env bash

# Moveo.AI Technical Challenges Master Launcher for macOS / Linux
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

show_menu() {
    clear
    echo "============================================================"
    echo "        MOVEO.AI TECHNICAL CHALLENGES MASTER LAUNCHER"
    echo "============================================================"
    echo ""
    echo "  [1] Launch Frontend Project (React + Tailwind + Vitest)"
    echo "  [2] Launch Backend REST API (Golang Gin Task API)"
    echo "  [3] Test & Run Backend Kafka Analytics (Golang Kafka)"
    echo "  [4] Test & Run Solutions Engineer Gateway (Moveo Webhooks)"
    echo "  [5] Run ALL Unit Tests Across All Projects"
    echo "  [6] Exit"
    echo ""
    echo "============================================================"
    read -p "Select an option (1-6): " choice

    case $choice in
        1)
            bash "$SCRIPT_DIR/run_frontend.sh"
            show_menu
            ;;
        2)
            bash "$SCRIPT_DIR/run_backend_rest.sh"
            show_menu
            ;;
        3)
            bash "$SCRIPT_DIR/run_backend_kafka.sh"
            show_menu
            ;;
        4)
            bash "$SCRIPT_DIR/run_solutions_engineer.sh"
            show_menu
            ;;
        5)
            run_all_tests
            show_menu
            ;;
        6)
            exit 0
            ;;
        *)
            show_menu
            ;;
    esac
}

run_all_tests() {
    clear
    echo "Running unit tests for all projects..."
    echo ""

    echo "[1/4] Running Frontend Tests..."
    cd "$SCRIPT_DIR/frontend" && npm test

    echo ""
    echo "[2/4] Running Backend REST Tests..."
    cd "$SCRIPT_DIR/backend-rest" && go test -v ./...

    echo ""
    echo "[3/4] Running Backend Kafka Tests..."
    cd "$SCRIPT_DIR/backend-kafka" && go test -v ./...

    echo ""
    echo "[4/4] Running Solutions Engineer Tests..."
    cd "$SCRIPT_DIR/solutions-engineer/gateway" && go test -v ./...

    echo ""
    echo "============================================================"
    echo "          ALL TESTS COMPLETED SUCCESSFULLY!"
    echo "============================================================"
    read -p "Press Enter to return to menu..."
}

show_menu
