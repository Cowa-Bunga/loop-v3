# Build the docker image with `nx docker-build public-api`.
# Run the container with `docker run -p 3000:3000 -t public-api`.
# Tip: Modify "docker-build" options in project.json to change docker build args.

FROM docker.io/node:lts-alpine

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 g++ make

WORKDIR /apps
RUN addgroup --system public-api && \
  adduser --system -G public-api public-api

COPY dist/apps/public-api public-api
COPY apps/public-api/app.json public-api

RUN chown -R public-api:public-api .

WORKDIR /apps/public-api
RUN npm i -g nest nx
RUN npm -f install

EXPOSE 3333
EXPOSE 80

CMD ["node", "main.js"]
