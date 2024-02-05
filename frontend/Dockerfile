FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

FROM builder AS production

EXPOSE 3000

CMD ["npm", "build"]


