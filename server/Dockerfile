FROM node

WORKDIR '/app'

COPY ./package.json ./

RUN npm install 

#RUN npm rebuild bcrypt --build-from-source
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]

