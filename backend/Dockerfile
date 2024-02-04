FROM node:alpine

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
