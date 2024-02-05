FROM node:lts AS builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate

# as development only
# CMD ["npm", "run", "start:migrate:dev"]

FROM builder AS production

EXPOSE 8080

CMD ["npm", "run", "start:prod"]
