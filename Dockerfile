FROM node:18-alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn --pure-lockfile

COPY --chown=node:node . .

EXPOSE 4040
 
CMD ["npm", "run", "start:dev"]