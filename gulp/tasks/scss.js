import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css" // сжатие css
import webpcss from "gulp-webpcss" // вывод webp изображений
import autoprefixer from "gulp-autoprefixer" // кроссбраузерность
import groupCssMediaQueries from "gulp-group-css-media-queries" // группировка медиа запросов, если в стилях вызываем несколько раз медиа с одним и той же шириной, то в итоге будет 1 медиа запрос внутри которого весь код, оптимизация!

// import injectScss from 'gulp-inject-scss';

// const imports = [
//   "../../src/scss/basis/_mixins.scss",
//   "../../src/scss/basis/_variables.scss"
// ];
const sass = gulpSass(dartSass);

export const scss = () => {
  // если нужно все файлы конвертить в css (н-м для разных страниц) но над этим нужно еще поработать
  return app.gulp.src(`${app.path.srcFolder}/scss/**/*.scss`, { sourcemaps: app.isDev })
  // return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>",
      })
    ))
    // .pipe(injectScss(imports))
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
    .pipe(app.plugins.if(app.isBuild, webpcss({
      webClass: ".webp",
      noWebpClass: ".no-webp",
    })))
    .pipe(app.plugins.if(app.isBuild, autoprefixer({
      grid: true,
      overrideBrowserlist: ["last 3 version"],
      cascade: true,
    })))
    // не сжатый файл будет без расширения .min
    .pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.css)))
    // .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.if(app.isBuild, cleanCss()))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream())
}