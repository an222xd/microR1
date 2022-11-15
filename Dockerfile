FROM node:16
WORKDIR /Backend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["nodemon","index"]