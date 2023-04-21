FROM node:19 as base

# CONTEXT MUST BE PARENT FOLDER !!!

WORKDIR /workdir
COPY backend/package*.json ./
EXPOSE 5000

FROM base as production
RUN npm install
COPY backend/src /workdir/src
COPY backend/tsconfig.json /workdir/
COPY backend/tsconfig.build.json /workdir/
COPY backend/.env /workdir/
RUN npm install -g typescript ts-node
RUN npm install -g pm2
RUN npm run build
# CMD ["sleep", "infinity"]
CMD ["ts-node", "dist/index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY backend/src /workdir/src
COPY backend/tsconfig.json /workdir/
COPY backend/.env /workdir/
CMD ["nodemon", "src/index.js"]
