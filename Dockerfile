FROM node:14

WORKDIR /usr/src
# Cuando copias mas de un archivo fuente, el destino debe ser una carpeta con el slash al final
COPY ["package.json", "package-lock.json" , "/usr/src/"]

RUN npm i

COPY [".", "/usr/src"]

EXPOSE 8090

CMD ["npm", "run", "dev"]

