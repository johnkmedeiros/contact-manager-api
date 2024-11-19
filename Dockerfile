# node image
FROM node:20

# working directory
WORKDIR /app

# dependencies
COPY package*.json ./
RUN npm install

# copy application files
COPY . .

# expose the API port
EXPOSE 3000

# command to start the server
CMD ["npm", "run", "dev"]
