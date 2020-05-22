FROM node:lts-alpine as build-front

WORKDIR /tmp/build
#Install dependencies
COPY front/package.json ./
RUN npm install

#Build the frontend
COPY front ./
RUN npm run build


FROM node:lts-alpine as build-back

WORKDIR /tmp/build
#Install dependencies
COPY back/package.json ./
RUN npm install --only=prod

#Build the frontend
COPY back ./


FROM node:lts-alpine

WORKDIR /cozyquiz
COPY --from=build-back /tmp/build ./
COPY --from=build-front /tmp/build/dist public

CMD ["node", "index.js"]
