#!/bin/bash

# prune docker
docker stop $(docker ps --filter name=rpgpaie -q)
docker rm -f $(docker ps --filter status=exited -q)
docker rmi -f $(docker images rpgpaie* -q)
docker image prune -f

# fix for "Permission denied" error
sudo chmod -R 777 rpgpaie/

# prepare new deployment folder
mv rpgpaie/ old_rpgpaie/
git clone git@github.com:gnos28/rpgpaie.git
cd rpgpaie/
# git pull -f --rebase origin main

# récupérer les .env uploadés précédemment avec scp et les déplacer ici
mv ../dotenv/.env.backend backend/.env

# build docker images
docker compose -f docker-compose.prod.yml build --no-cache

# delete old folder
sudo rm -Rf ../old_rpgpaie/

# start new containers !
docker compose -f docker-compose.prod.yml up >~/logs/rpgpaie/log.compose.$(date +"%s") 2>&1 &
disown
