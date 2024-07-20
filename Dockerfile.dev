# from command
FROM node:18-alpine3.19

# change the directory with workdir
WORKDIR /app

# copy the code to the container
COPY package.json .

RUN npm install

# RUN install the packages
COPY . .

# expose a port
EXPOSE 3000

# add  a command CMD
CMD ["npm", "run", "dev"]