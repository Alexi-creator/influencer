import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
// import pug from "gulp-pug";

export const html = () => {
  return app.gulp.src(app.path.src.htmlPages)
    // ошибки показывает в windows
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "HTML",
        message: "Error: <%= error.message %>",
      })
    ))
    // позволяет включать куски html в основной файл html
    .pipe(fileInclude())
    // при использовании pug расскоментить снизу и закоментить сврезу строчку
    // .pipe(pug({
    //   // сжатия html файла
    //   pretty: true,
    //   // показывать в терминале какой файл обработан
    //   verbose: true
    // }))
    // замена подстроки
    .pipe(app.plugins.replace(/@img\//g, "img/"))
    // подключение в html picture c webp
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    // versionNumber чтобы не браузер не кэшировал скаченные ресурсы
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          "value": "%DT%",
          "append": {
            "key": "_v",
            "cover": 0,
            "to": [
              "css",
              "js",
            ],
          },
          "output": {
            "file": "gulp/version.json"
          }
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream())
}