# Build stage
FROM --platform=linux/amd64 node:20 as build

WORKDIR /usr/src/supportgg

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .
COPY tsconfig.json .

RUN npm run build

# Production stage
FROM --platform=linux/amd64 node:18 as production

WORKDIR /usr/src/supportgg

COPY --from=build /usr/src/supportgg/dist ./dist
COPY --from=build /usr/src/supportgg/package.json .
COPY --from=build /usr/src/supportgg/package-lock.json .
COPY --from=build /usr/src/supportgg/tsconfig.json .

RUN npm install --only=production
RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start"]