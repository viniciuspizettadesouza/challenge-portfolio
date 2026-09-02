FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY challenges/challenge-user-management/demo challenges/challenge-user-management/demo
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @challenge/user-management-demo build

FROM nginx:1.27-alpine
COPY challenges/challenge-user-management/demo/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/challenges/challenge-user-management/demo/dist /usr/share/nginx/html
EXPOSE 80
