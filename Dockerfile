FROM node:12.7-alpine

# ---- Base ----
FROM spokedev/node_base:alpine_12 AS base
RUN npm set progress=false
RUN apk add --no-cache git
EXPOSE 3000
WORKDIR /usr/src/app

COPY package.json ./

COPY dist ./dist/

RUN npm install --only=production --no-optional --no-audit

EXPOSE 3000
CMD ["node", "dist/server.js"] 
