ARG NODE_VERSION=18

FROM node:$NODE_VERSION AS builder
WORKDIR /usr/src
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build

FROM node:$NODE_VERSION

ARG PORT=3000
ARG GITHUB_TOKEN

WORKDIR /usr/app
COPY --from=builder /usr/src/package*.json ./
COPY --from=builder /usr/src/dist ./dist
RUN npm ci --only=production

ENV PORT=$PORT
ENV GITHUB_TOKEN=$GITHUB_TOKEN

EXPOSE $PORT
CMD ["node", "./dist/server"]
