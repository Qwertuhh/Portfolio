FROM oven/bun:1.1 AS builder

WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile || bun install

COPY . .
RUN bun run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
