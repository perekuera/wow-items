#!/bin/bash

if ! docker info &> /dev/null; then
    echo "Docker service is not running. Starting..."
    systemctl start docker
fi

AC_DOCKER_COMPOSE="../azerothcore-wotlk/docker-compose.custom.yml"

ac_build=false
ac_up=false
ac_down=false
ac_restart=false

for arg in "${@,,}"; do
    case "$arg" in
        build)
            ac_build=true
            ;;
        up)
            ac_up=true
            ;;
        down)
            ac_down=true
            ;;
        restart)
            ac_restart=true
            ;;
        *)
            echo "Unknown argument: $arg"
            exit 1
            ;;
    esac
done

function do_build() {
    echo "Building..."
    docker compose -f "$AC_DOCKER_COMPOSE" build
}

function do_up() {
    echo "Starting..."
    docker compose -f "$AC_DOCKER_COMPOSE" up -d
}

function do_down() {
    echo "Stopping..."
    docker compose -f "$AC_DOCKER_COMPOSE" down
}

function do_restart() {
    echo "Restarting..."
    docker compose -f "$AC_DOCKER_COMPOSE" restart
}

if [ "$ac_build" = "true" ]; then
    do_build
fi

if [ "$ac_up" = "true" ]; then
    do_up
elif [ "$ac_down" = "true" ]; then
    do_down
elif [ "$ac_restart" = "true" ]; then
    do_restart
fi

echo "Done!"

exit 0
