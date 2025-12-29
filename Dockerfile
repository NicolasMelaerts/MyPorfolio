# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine

WORKDIR /app

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Command to start the server
# -s: Single-page application support (rewrites 404s to index.html)
# -l: Listen on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
