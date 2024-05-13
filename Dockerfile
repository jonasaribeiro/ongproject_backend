FROM node:20

RUN apt-get update && apt-get install -y ffmpeg postgresql postgresql-contrib

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

COPY init.sh /app/init.sh

RUN chmod +x /app/init.sh

CMD ["/app/init.sh"]