import replace from "gulp-replace"; // поиск и замен
import plumber from "gulp-plumber"; // обработка ошибко
import notify from "gulp-notify"; // сообщения
import browserSync from "browser-sync"; // локальный сервер
import newer from "gulp-newer"; // проверка обновлений только тех изображений которые появились или изменились
import ifPlugin from "gulp-if"; // условное ветвление

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browserSync: browserSync,
  newer: newer,
  if: ifPlugin,
}
