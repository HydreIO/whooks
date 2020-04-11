FROM node:13.8-alpine
WORKDIR /app
RUN npm i -g pnpm
COPY package.json .
RUN pnpm i
COPY . .
CMD npm run start
