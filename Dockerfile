FROM node:16 as base

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build

CMD ["node", "./dist/index.js"]
