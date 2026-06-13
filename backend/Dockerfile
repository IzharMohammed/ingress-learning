FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Expose the port Express runs on (we configured 3001)
EXPOSE 3001

# Start the server
CMD ["node", "index.js"]
