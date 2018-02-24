FROM node:9.6.1-alpine
#app folder
RUN mkdir -p /usr/src/devsu
WORKDIR /usr/src/devsu
COPY package*.json /usr/src/devsu/
#install dependencies
RUN npm install
#upload app
COPY . /usr/src/devsu
#execute
CMD [ "node", "app.js" ]
EXPOSE 8002