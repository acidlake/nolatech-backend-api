FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

# Build the TypeScript code
RUN pnpm build

RUN pnpm migrate:down

RUN pnpm migrate:up

RUN pnpm seed

# Expose the port the app runs on
EXPOSE 3001

CMD ["pnpm", "start"]
