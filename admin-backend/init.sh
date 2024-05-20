#!/bin/bash
# Esperar até que o PostgreSQL esteja pronto
while ! pg_isready -h db -p 5432 -U onguser; do
    echo "Aguardando o DB..."
    sleep 2
done

echo "PostgreSQL pronto. Executando migrações do Prisma..."
npx prisma migrate deploy

echo "Migrações aplicadas. Iniciando a aplicação..."
node start
