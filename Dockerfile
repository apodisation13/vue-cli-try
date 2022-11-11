FROM node:16-alpine as build-stage

# устанавливаем простой HTTP-сервер для статики
# RUN npm install -g http-server

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# принимаем аргумент из экшена билда, из секретов и записываем его в этот файл
ARG VUE_APP_API_URL
RUN echo "VUE_APP_API_URL=$VUE_APP_API_URL" > .env.production

# собираем приложение для production с минификацией
RUN npm run build

EXPOSE 8080
# CMD [ "http-server", "dist" ]
#CMD [ "npm", "run", "serve" ]


# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /var/www
CMD ["nginx", "-g", "daemon off;"]
