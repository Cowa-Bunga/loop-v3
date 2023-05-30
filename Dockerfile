# Dual app development in docker for local and CI dev env - WIP

#  NOTES about NX in docker containers 
# -------------------------------------
#  NX Daemon is disabled in docker, and docker port mappings fail silently.
#  this is for nx cloud operation, and possibly even lock-in. it can be bypassed and enabled
#  we can also use a hosted cache for GCS - see link below
# @see: https://github.com/wvanderdeijl/nx-remotecache-gcs
# the nx daemon issue for docker described
# @see: https://github.com/nrwl/nx/issues?q=is%3Aissue+is%3Aopen+docker

FROM node:18

# Nx host-  this may need to be set in the project.json for port mapping in docker
#           "hostname": "0.0.0.0"
ENV HOSTNAME=0.0.0.0
ENV NX_DAEMON=true

ENV API_AUTH_URL=https://cb-authentication-api-ukxjb66ceq-ew.a.run.app
ENV NEXT_PUBLIC_API_AUTH_URL=https://cb-authentication-api-ukxjb66ceq-ew.a.run.app

# CI hosted use only
# ENV NEXTAUTH_URL=https://loop-v3-ukxjb66ceq-ew.a.run.app
# ENV NEXT_PUBLIC_NEXTAUTH_URL=https://loop-v3-ukxjb66ceq-ew.a.run.app

# this is for local usage only
ENV NEXTAUTH_URL=http://localhost:3000
ENV NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000


ENV NEXTAUTH_SECRET=Fv7wzu/V1HLsYwOX/Ujf7g2x4V6mGG/twvCN5rOGxcaYjYr4wxcAMyR/oqf2GSwDm2RtdQhWHKuPqHHD2efEb314DYwb4f7puMIn1WdI1BE6yvVFsDvy3z0z+S/SO3b8Iau3GjgEfChB4uSpt/ucOEfjpwBvgISMF2g/qAHxJ6U=
ENV NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIzaSyCgiluwpE3dNxGLL_iAPaV4SKZDTm_tpME

WORKDIR /apps

COPY . .

RUN npm i -g nx@15.8.6
RUN npm install -f
EXPOSE 3000
EXPOSE 3333

RUN nx daemon --start

CMD [ "npm", "run", "all"]
