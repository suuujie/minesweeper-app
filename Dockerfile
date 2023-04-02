FROM node:alpine as base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./

# FROM node:slim
# WORKDIR /app
# COPY --from=base . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
