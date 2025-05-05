# Étape 1 : Construire l'app Angular
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx ng build WorkspaceWorkflow --configuration production


# Étape 2 : Servir avec NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/workspace-workflow/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
