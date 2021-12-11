FROM node:14

COPY ["package.json", "package-lock.json" , "/usr/src/"]

WORKDIR /usr/src

RUN npm i

COPY [".", "/usr/src"]

EXPOSE 8090

CMD ["npm", "run", "dev"]

