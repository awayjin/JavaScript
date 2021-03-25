FROM node:lts-alpine as deps

WORKDIR /app
COPY package.json .npmrc ./
RUN npm install --production

FROM deps as builder
ARG ENV=test
ARG LOG='发版的人很懒, 什么都没说'
ARG VERSION=''
ARG TIME=''

COPY . .
# 设置环境变量，sentry-cli使用以及设置sentry 版本，类似prod-2020-03-25-16:25:59-4ddad19
RUN APP_ENV=$ENV APP_VERSION=$VERSION APP_VERSION_TIME=$TIME npm run build:${ENV}
# 下面哪行需要sentry才开启
# RUN ./node_modules/.bin/sentry-cli releases files ${ENV}-${TIME}-${VERSION} upload-sourcemaps './dist/men-demo/' --rewrite --url-prefix '~/men-demo/' && find ./dist/men-demo/ -name "*.map"| xargs rm -f
# RUN npm run upload:${ENV}

# 选择更小体积的基础镜像
FROM nginx:stable-alpine

COPY --from=builder /app/dist/men-demo /usr/share/nginx/html
COPY default.conf    /etc/nginx/conf.d/
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
