# Build the docker image with `nx docker-build frontend`.
# Run the container with `docker run -p 3000:3000 -t frontend`.
# Tip: Modify "docker-build" options in project.json to change docker build args.

FROM docker.io/node:lts-alpine
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 g++ make

ENV PORT=3000
ENV NODE_ENV=production
ENV NX_DAEMON=true

ENV API_AUTH_URL=https://cb-authentication-api-ukxjb66ceq-ew.a.run.app
ENV NEXT_PUBLIC_API_AUTH_URL=https://cb-authentication-api-ukxjb66ceq-ew.a.run.app

ENV NEXTAUTH_URL=https://loop-v3-ukxjb66ceq-ew.a.run.app
ENV NEXT_PUBLIC_NEXTAUTH_URL=https://loop-v3-ukxjb66ceq-ew.a.run.app

ENV NEXTAUTH_SECRET=Fv7wzu/V1HLsYwOX/Ujf7g2x4V6mGG/twvCN5rOGxcaYjYr4wxcAMyR/oqf2GSwDm2RtdQhWHKuPqHHD2efEb314DYwb4f7puMIn1WdI1BE6yvVFsDvy3z0z+S/SO3b8Iau3GjgEfChB4uSpt/ucOEfjpwBvgISMF2g/qAHxJ6U=
ENV NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME

WORKDIR /apps

RUN addgroup --system frontend && \
  adduser --system -G frontend frontend

COPY dist/apps/frontend frontend
COPY apps/frontend/app.json frontend
# COPY package.json frontend

RUN chown -R frontend:frontend .
# RUN next telemetry disable

WORKDIR /apps/frontend
RUN npm i -g next@13.1.1 nx
RUN npm i --legacy-peer-deps

EXPOSE 3000

CMD [ "next", "start" ]
