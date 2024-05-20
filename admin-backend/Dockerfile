# Base image
FROM node:20 AS base

# Configuração do diretório de trabalho
WORKDIR /app

# Instalação de dependências
RUN apt-get update && apt-get install -y ffmpeg

# Copia o arquivo de pacotes e instala as dependências
COPY package.json .
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Define variáveis de ambiente diretamente no Dockerfile
ENV NODE_ENV=development
ENV DATABASE_URL=postgresql://adminuser:ADMINPASSWORD@db:5432/admin_db
ENV SERVER_PORT=8081

# Copia o schema do Prisma (caso compartilhado)
COPY ../prisma ./prisma

# Gera o cliente do Prisma
RUN npx prisma generate

# Configuração de porta
EXPOSE 8081

# Etapa de desenvolvimento
CMD ["npm", "run", "dev"]
