FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

<<<<<<< HEAD
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]
=======
RUN npm run build 

EXPOSE 3000

CMD ["node", "dist/main"] 
>>>>>>> 51e75ef5f5a1f48bb8cd816c9ed81ac5c0c57157
