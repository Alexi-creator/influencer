export const copyInDocs = () => {
  return app.gulp.src(`${app.path.builderFolder}/**/*.*`)
    .pipe(app.gulp.dest(app.path.docsFolder))
}