FROM node:16-alpine

# Instala git
RUN apk update && \
    apk add --no-cache git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "start"]
