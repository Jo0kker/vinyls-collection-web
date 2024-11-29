#!/bin/bash

# Crée le fichier .npmrc avec les configurations nécessaires
cat <<EOL > .npmrc
@fortawesome:registry=https://npm.fontawesome.com/
@awesome.me:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=\${FONTAWESOME_PACKAGE_TOKEN}
EOL

echo ".npmrc a été créé avec succès."
