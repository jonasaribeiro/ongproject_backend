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

# Criação do arquivo .env durante o build
RUN echo "NODE_ENV=development\nDATABASE_URL=postgresql://useruser:USERPASSWORD@db:5432/user_db\nSERVER_PORT=8080" > .env

# Copia o schema do Prisma (caso compartilhado)
COPY ../prisma ./prisma

# Gera o cliente do Prisma
RUN npx prisma generate

# Configuração de porta
ENV PORT=8080
EXPOSE 8080

# Etapa de desenvolvimento
FROM base AS development
CMD ["npm", "run", "dev"]
