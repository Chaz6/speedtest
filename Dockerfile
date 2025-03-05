FROM node:23-alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY src/* ./

USER node

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "speed.js" ]
