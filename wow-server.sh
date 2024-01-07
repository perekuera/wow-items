#!/bin/bash

if ! docker info &> /dev/null; then
    echo "Docker service is not running."
    exit 1
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
    docker compose -f "$AC_DOCKER_COMPOSE" build
}

function do_up() {
    docker compose -f "$AC_DOCKER_COMPOSE" up -d
}

function do_down() {
    docker compose -f "$AC_DOCKER_COMPOSE" down
}

function do_restart() {
    docker compose -f "$AC_DOCKER_COMPOSE" restart
}

if [ "$cmd" == "build" ]; then
    do_build
fi

if [ "$cmd" == "up" ]; then
    do_up
elif [ "$cmd" == "down" ]; then
    do_down
elif [ "$cmd" == "restart" ]; then
    do_restart
fi

echo "Done."

exit 0
