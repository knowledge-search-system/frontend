FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

ENV GATEWAY_UPSTREAM=gateway:8082

EXPOSE 80
