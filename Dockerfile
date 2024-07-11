FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

# Build the TypeScript code
RUN pnpm build

RUN pnpm migrate up

RUN pnpm seed

# Expose the port the app runs on
EXPOSE 3000

CMD ["pnpm", "start"]