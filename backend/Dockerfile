FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./server.js ./

CMD ["yarn", "start"]
