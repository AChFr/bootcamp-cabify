FROM node

COPY package*.json ./
RUN npm install
EXPOSE 9001
COPY  . ./

CMD ["npm", "start"]