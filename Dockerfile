FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile \
    ; elif [ -f package-lock.json ]; then npm ci \
    ; elif [ -f pnpm-locj.yaml]; then npm install -g pnpm && pnpm install \
    ; fi
  
COPY . .

RUN npx next build

FROM node:22-alpine AS runner

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
WORKDIR /app
USER nextjs

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./next.config.ts

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENV NODE_ENV production

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["npx", "next", "start", "-p", "3000"]