# Base image with Node and Playwright browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.58.2-jammy
# Set working directory inside the container
WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Default command – runs all tests
CMD ["npm", "test"]