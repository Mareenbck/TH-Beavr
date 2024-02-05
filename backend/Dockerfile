FROM node:lts AS builder

WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma/* ./

RUN npm install
COPY . .
RUN npm run build
RUN npx prisma generate

EXPOSE 8080
EXPOSE 5555

CMD ["npm", "run", "start:migrate:dev"]

# FROM builder AS production
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY prisma/* ./
# RUN npm install --production=true
# COPY --from=builder /usr/src/app/dist ./dist

# CMD ["npm", "run", "start:prod"]
