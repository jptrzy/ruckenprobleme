FROM node:lts-slim as development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "build"]

FROM node:lts-slim as production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=development /app/.dist .dist

CMD ["npm", "run", "start"]