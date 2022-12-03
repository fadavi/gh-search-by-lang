ARG NODE_VERSION=18

FROM node:$NODE_VERSION AS builder
WORKDIR /usr/src
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm ci
RUN npm run build

FROM node:$NODE_VERSION
WORKDIR /usr/app
COPY --from=builder /usr/src/package*.json ./
COPY --from=builder /usr/src/dist ./dist
RUN npm ci --omit=dev

ENV NODE_ENV=production

ARG GITHUB_TOKEN
RUN test -n "$GITHUB_TOKEN"
ENV GITHUB_TOKEN=$GITHUB_TOKEN

ARG HOST=0.0.0.0
ENV HOST=$HOST

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD ["node", "./dist/server"]
