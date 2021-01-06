#!/bin/bash
# ------------------------------------------------------------------
# Title:        [Entrypoint Script]
# Version:      [1.0.0]
# Author:       [Ramon Walther]
#
# Description:  Simple entrypoint for our frontend container
#               to install all necessary packages and build
#               the frontend container.
# ------------------------------------------------------------------
PREFIX="[Entrypoint Script]"

# Default init procedure
function init() {
    echo "$PREFIX Initializing frontend..."
    install
	build
    start
}

# Development init procedure
function noBuildInit() {
    echo "$PREFIX Initializing frontend... (No Build Mode)"
    install
    start
}

# Install only procedure
function install() {
    echo "$PREFIX Installing all necessary packages..."
	npm i --legacy-peer-deps
}

# Build only procedure
function build() {
    echo "$PREFIX Building container..."
    npm run build
}

# Start only procedure
function start() {
    echo "$PREFIX Starting application..."
    npm start
}

# Arguments handling
function main() {
    if ([ "$1" != '' ]); then   # Check for command line argument
        case "$1" in
            -skipbuild)      noBuildInit 	    ;;
            *)	echo "$PREFIX Failed: Argument '$1' not found."
                exit 1	;;
        esac
    else    # No argument was given
        echo "$PREFIX No arguments given. Running default init procedure..."
        init
    fi
}
main $1