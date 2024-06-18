FROM node

WORKDIR /app

COPY . .

RUN npm install
RUN npm run dev:tsc
EXPOSE 3000

CMD ["npm", "dev:serve"]

