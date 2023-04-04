# Get NPM packages
FROM node:18 AS builder
ENV NX_DAEMON false
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Production image, copy all the files and run next
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV production

RUN groupadd --gid 1001 nodejs --system
RUN useradd --uid 1001 nextjs --gid nodejs --system --create-home

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --only=production

USER nextjs
EXPOSE 3000

CMD ["npm", "start"]
