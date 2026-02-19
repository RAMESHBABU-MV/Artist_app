FROM node:22-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the development server
# --host 0.0.0.0 is required for Docker to expose the port
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
