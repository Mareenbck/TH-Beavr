FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM builder AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production=true
COPY --from=builder /usr/src/app/build ./build
EXPOSE 3000

CMD ["npm", "start"]


