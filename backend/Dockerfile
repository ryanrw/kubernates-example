FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /usr/app

COPY dist .

COPY package.json .

# add gcc
RUN apk add --update --no-cache alpine-sdk python3

RUN yarn global add node-gyp

RUN CXX=g++ yarn install

CMD yarn start:prod

EXPOSE 4000