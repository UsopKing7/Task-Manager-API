FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm i --only=production

COPY . .
RUN npm run build

EXPOSE 3001
CMD ["node", "dist/main"]

