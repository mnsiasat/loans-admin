# Base Image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source code
COPY . .

# Install Prisma CLI globally
RUN npm install -g prisma

# Generate Prisma Client
RUN npx prisma generate

# Run Prisma Migrations on container start
#CMD npx prisma migrate deploy && npm run build && npm run dev

CMD ["npm", "run", "dev"]