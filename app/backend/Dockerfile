FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN npm install
RUN npm prestart
CMD ["npm", "start"]

