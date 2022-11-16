 FROM node:16
WORKDIR /index
COPY package.json /
RUN npm install
COPY . .
CMD ["npm", "start"]
