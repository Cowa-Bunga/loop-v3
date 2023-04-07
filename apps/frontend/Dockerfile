# Build the docker image with `nx docker-build frontend`.
# Run the container with `docker run -p 3000:3000 -t frontend`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
FROM docker.io/node:lts-alpine
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 g++ make

ENV PORT=3000
ENV NODE_ENV=production
ENV NEXTAUTH_URL=https://loop-v3-ukxjb66ceq-ew.a.run.app
ENV NEXTAUTH_URL_INTERNAL=0:0:0:0:3000
ENV API_AUTH_URL=https://cb-authentication-api-ukxjb66ceq-ew.a.run.app
ENV NEXTAUTH_SECRET=this-is-a-secret-that-isnt-really-much-of-a-secret-right-now

WORKDIR /app

RUN addgroup --system frontend && \
  adduser --system -G frontend frontend

COPY dist/apps/frontend frontend
COPY apps/frontend/app.json frontend
# TODO: reduce size
COPY package.json frontend

RUN chown -R frontend:frontend .

WORKDIR /app/frontend

RUN npm --omit=dev -f install
RUN npm i -g next@13.1.1 nx

EXPOSE 3000

CMD [ "next", "start" ]
