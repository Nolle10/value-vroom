FROM alpine:3.18

RUN apk add nodejs npm

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run openapi

RUN npx expo export:web

EXPOSE 3000

RUN npm install serve
CMD ["sh", "-c", "npx serve web-build"]