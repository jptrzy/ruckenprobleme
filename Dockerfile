FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g concurrently

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]