# Stage 1: Build
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Receive the API Key from build args
ARG _GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$_GEMINI_API_KEY
ENV GEMINI_API_KEY=$_GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
