#!/bin/bash

# Démarrer l'application avec PM2
pm2 start "npm start" --name vinyl-app
pm2 save
pm2 logs
