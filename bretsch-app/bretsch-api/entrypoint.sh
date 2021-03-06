#!/bin/bash
# ------------------------------------------------------------------
# Title:        [Entrypoint Script]
# Version:      [1.0.2]
# Author:       [Ramon Walther]
#
# Description:  Simple entrypoint for our api container to
#               install all necessary packages and build the
#               api container.
# ------------------------------------------------------------------
PREFIX="[Entrypoint Script]"

# Default init procedure
function init() {
    echo "$PREFIX Initializing api..."
    install
	build
    npm run typeorm schema:sync
    start
}

# Development init procedure
function devInit() {
    echo "$PREFIX Initializing api... (Dev Mode)"
    install
	build
    npm run typeorm schema:sync
    devStart
}

# Install only procedure
function install() {
    echo "$PREFIX Installing all necessary packages..."
	npm i
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

# Dev-Start only procedure
function devStart() {
    echo "$PREFIX Starting application... (Dev Mode)"
    npm run dev
}

# Arguments handling
function main() {
    if ([ "$1" != '' ]); then   # Check for command line argument
        case "$1" in
            -init)      init 	    ;;
			-dev)       devInit     ;;
            *)	echo "$PREFIX Failed: Argument '$1' not found."
                exit 1	;;
        esac
    else    # No argument was given
        echo "$PREFIX No arguments given. Running default init procedure..."
        init
    fi
}
main $1