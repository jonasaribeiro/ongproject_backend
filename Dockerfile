FROM node:20

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "start"]