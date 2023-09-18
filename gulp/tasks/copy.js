export const copy = () => {
  // app глобальная переменная в node т.к. мы назначили ее в gulpfile

  // берем файлы из указанного пути
  return app.gulp.src(app.path.src.files)
  // копируем
    .pipe(app.gulp.dest(app.path.build.files))
}