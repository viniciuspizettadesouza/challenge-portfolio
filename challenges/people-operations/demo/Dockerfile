FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY challenges/people-operations/demo challenges/people-operations/demo
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @challenge/people-operations-demo build

FROM nginx:1.27-alpine
COPY challenges/people-operations/demo/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/challenges/people-operations/demo/dist /usr/share/nginx/html
EXPOSE 80
