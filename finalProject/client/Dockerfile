FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

EXPOSE 3000

# Use npx to run react-scripts from node_modules
CMD ["sh", "-c", "GENERATE_SOURCEMAP=false npx react-scripts start"]