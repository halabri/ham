FROM node:24-slim
WORKDIR /app
COPY /.next/standalone ./
COPY /.next/static ./.next/static
COPY /public ./public
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]