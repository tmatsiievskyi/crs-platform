FROM node:22-alpine3.19

WORKDIR /app

COPY package.json ./
# COPY package-lock.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "start:dev:cluster"]