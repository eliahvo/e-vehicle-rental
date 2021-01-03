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

# Arguments handling
function main() {
    echo "$PREFIX Initializing frontend..."
    install
	build
    start
}
main