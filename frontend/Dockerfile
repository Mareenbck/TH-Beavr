FROM node:latest AS dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN npm install


CMD ["npm", "run", "start"]
