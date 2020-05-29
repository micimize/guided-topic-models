FROM node:7-alpine
MAINTAINER Glavin Wiechert <glavin.wiechert@gmail.com>

# Defines our working directory in container
WORKDIR /usr/src/app

RUN apk add --no-cache git

RUn mkdir -p /root/.npm/_git-remotes/

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

CMD npm run static
