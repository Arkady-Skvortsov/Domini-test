FROM node:16.13.0

WORKDIR /usr/src/domini

COPY package*.json ./

RUN npm install 

COPY . ./ 

CMD ["npm", "run", "start"]