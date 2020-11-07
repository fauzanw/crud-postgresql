FROM node:14.8.0

WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
EXPOSE ${APP_PORT}
RUN ["npx", "sequelize", "db:migrate"]
CMD ["node", "app"]