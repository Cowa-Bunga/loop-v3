FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

WORKDIR /app
COPY .next ./.next
COPY package.json ./package.json
RUN npm i
RUN npm start -p $PORT
USER nextjs
EXPOSE 3000

CMD ["npm", "start"]