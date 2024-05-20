#!/bin/bash

# Verifica se o arquivo .env já existe em admin-backend
if [ ! -f ./admin-backend/.env ]; then
  cat <<EOL > ./admin-backend/.env
NODE_ENV=development
DATABASE_URL=postgresql://adminuser:ADMINPASSWORD@db:5432/admin_db
SERVER_PORT=8081
EOL
  echo "Arquivo .env criado em admin-backend com valores padrão."
else
  echo "Arquivo .env já existe em admin-backend. Nenhuma ação foi tomada."
fi

# Verifica se o arquivo .env já existe em user-backend
if [ ! -f ./user-backend/.env ]; then
  cat <<EOL > ./user-backend/.env
NODE_ENV=development
DATABASE_URL=postgresql://useruser:USERPASSWORD@db:5432/user_db
SERVER_PORT=8080
EOL
  echo "Arquivo .env criado em user-backend com valores padrão."
else
  echo "Arquivo .env já existe em user-backend. Nenhuma ação foi tomada."
fi
