ARG build_cmd="build"

FROM node:lts-alpine as build
ARG build_cmd

ENV VITE_API_URL=https://api.vatusa.dev

WORKDIR /app
COPY package*.json ./
COPY . .
RUN yarn install && \
    yarn $build_cmd

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.server.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
