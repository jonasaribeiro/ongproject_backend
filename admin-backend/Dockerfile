FROM node:20 AS base

# Instala ffmpeg e git
RUN apt-get update && \
    apt-get install -y ffmpeg git && \
    apt-get clean

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
