FROM node:20 AS base

# Instala git
RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
