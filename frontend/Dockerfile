# frontend/Dockerfile
# CAMBIO: Usamos la versión 22 en lugar de la 18
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]