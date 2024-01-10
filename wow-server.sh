#!/bin/bash

if [ "$1" = "" ]; then
  echo "Error: an argument is needed"
  echo "Use: $0 [build] [up] [down] [restart] [logs] [ls]"
  exit 1
fi

if ! docker info &> /dev/null; then
    echo "Docker service is not running. Starting..."
    systemctl start docker
fi

AC_DOCKER_COMPOSE="../azerothcore-wotlk/docker-compose.custom.yml"

ac_build=false
ac_up=false
ac_down=false
ac_restart=false
ac_logs=false
ac_ls=false

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
        logs)
            ac_logs=true
            ;;
        ls)
            ac_ls=true
            ;;
        *)
            echo "Unknown argument: $arg"
            exit 1
            ;;
    esac
done

if [ "$ac_build" = "true" ]; then
    echo "Building..."
    docker compose -f "$AC_DOCKER_COMPOSE" build
fi

if [ "$ac_up" = "true" ]; then
    echo "Starting..."
    docker compose -f "$AC_DOCKER_COMPOSE" up -d
elif [ "$ac_down" = "true" ]; then
    echo "Stopping..."
    docker compose -f "$AC_DOCKER_COMPOSE" down
elif [ "$ac_restart" = "true" ]; then
    echo "Restarting..."
    docker compose -f "$AC_DOCKER_COMPOSE" restart
fi

if [ "$ac_logs" = "true" ]; then
    echo "Logging..."
    docker compose -f "$AC_DOCKER_COMPOSE" logs
fi

if [ "$ac_ls" = "true" ]; then
    echo "Listing..."
    docker compose -f "$AC_DOCKER_COMPOSE" ls
fi

echo "Done!"

exit 0
