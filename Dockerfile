# Base image untuk install dependencies
FROM node:lts-bullseye-slim AS base
WORKDIR /usr/src
COPY package*.json ./
RUN npm install

# Build stage
FROM base AS build
COPY . .
RUN npm run build

# Development stage
FROM base AS local
COPY . .
CMD ["npm", "run", "start:dev"]

# Production release
FROM node:lts-bullseye-slim AS release
WORKDIR /usr/src
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /usr/src/dist ./dist
CMD ["node", "dist/main.js"]
