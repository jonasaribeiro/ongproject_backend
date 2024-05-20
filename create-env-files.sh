#!/bin/bash

# Função para criar o .env para admin-backend
create_admin_env() {
  cat <<EOL > ./admin-backend/.env
NODE_ENV=development
DATABASE_URL=postgresql://adminuser:ADMINPASSWORD@db:5432/admin_db
SERVER_PORT=8081
EOL
  echo "Arquivo .env criado em admin-backend com valores padrão."
}

# Função para criar o .env para user-backend
create_user_env() {
  cat <<EOL > ./user-backend/.env
NODE_ENV=development
DATABASE_URL=postgresql://useruser:USERPASSWORD@db:5432/user_db
SERVER_PORT=8080
EOL
  echo "Arquivo .env criado em user-backend com valores padrão."
}

# Cria .env para admin-backend se não existir
if [ ! -f ./admin-backend/.env ]; then
  create_admin_env
else
  echo "Arquivo .env já existe em admin-backend. Nenhuma ação foi tomada."
fi

# Cria .env para user-backend se não existir
if [ ! -f ./user-backend/.env ]; then
  create_user_env
else
  echo "Arquivo .env já existe em user-backend. Nenhuma ação foi tomada."
fi
