# Build the docker image with `nx docker-build backend`.
# Run the container with `docker run -p 3000:3000 -t backend`.
# Tip: Modify "docker-build" options in project.json to change docker build args.

FROM docker.io/node:lts-alpine

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 g++ make

WORKDIR /apps
RUN addgroup --system backend && \
  adduser --system -G backend backend

COPY dist/apps/backend backend
COPY apps/backend/app.json backend

RUN chown -R backend:backend .

WORKDIR /apps/backend
RUN npm i -g nest nx
RUN npm -f install

EXPOSE 3333
EXPOSE 80

CMD ["node", "main.js"]
