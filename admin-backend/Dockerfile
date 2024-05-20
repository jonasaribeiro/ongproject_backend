FROM node:20 AS base

# Instala ffmpeg e git
RUN apk update && \
    apk add --no-cache ffmpeg git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
