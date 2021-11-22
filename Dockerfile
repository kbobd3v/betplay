FROM node:14

COPY ["package.json", "package-lock.json" , "/usr/src/"]

WORKDIR /usr/src

RUN npm i

COPY [".", "/usr/src"]

EXPOSE 3000

CMD ["npm", "run", "dev"]

