# Проект Movies-Explorer бэкенд

API для аутентификации пользователей и сохранения фильмов.
  
## Описание проекта:

1. *О проекте:*

    Данный проект представляет собой Backend-часть приложения Movies-Explorer.  
    Movies-Explorer - это сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.  

2. *Использованы следующие технологии:*
    * cервер был создан при помощи фреймворка *Express*;
    * настроены маршруты и контроллеры при помощи *Express*;
    * проект подключен к серверу MongoDB по адресу **mongodb://127.0.0.1:27017/bitfilmsdb**;
    * использована специальная ODM-библиотека *Mongoose*, при помощи которой были созданы схемы и модели пользователя и фильмов;
    * использован мидлвэр *body-parser*;
    * настроена обработка ошибок возникающих при запросах;
    * настроена централизованная обработка ошибок;
    * настроена валидация приходящих на сервер запросов при помощи библиотек *Joi* и *celebrate*;
    * создаем и проверяем токены на стороне сервера;
    * настроено логгирование при помощи библиотеки *Winston* и мидлвэра *Express-winston*.

## Директории:

  `/routes` — папка с файлами роутера;   
  `/controllers` — папка с файлами контроллеров пользователя и сохранённых фильмов;  
  `/models` — папка с файлами описания схем пользователя и сохранённых фильмов;
  `/errors` — папка с классами ошибок API, расширяющие конструктор Error.

## Команды для запуска проекта:

  `npm run start` — запускает сервер;  
  `npm run dev` — запускает сервер с hot-reload.  

## Ссылка на репозиторий в GitHub:

[https://github.com/21Julia/movies-explorer-api]

## Ссылки на проект

IP 84.252.130.240

Backend https://api.jkmovies-explorer.nomoredomainsicu.ru
