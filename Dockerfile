FROM node:22-alpine

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

# Build the TypeScript code



RUN pnpm build


# Expose the port the app runs on
EXPOSE 3001

CMD ["pnpm", "start"]
