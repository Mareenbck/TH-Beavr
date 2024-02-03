FROM node:alpine

WORKDIR /usr/src/app
COPY --chown=node:node . .
COPY --chown=node:node package*.json ./
RUN npm install
RUN npx prisma generate

RUN npm i -g @nestjs/cli

RUN npm run build
CMD ["npm", "run", "start:dev"]
