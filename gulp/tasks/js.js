import fs from "fs";
import path from "path";
import webpack from "webpack-stream";

export const js = () => {
  // Получите список файлов в этой директории
  const files = fs.readdirSync(app.path.src.jspages);

  // Создайте точки входа на основе найденных файлов
  const entry = {};
  files.forEach((file) => {
    // if (file.endsWith('.js')) {
    if (file.endsWith('.ts')) {
      const name = path.parse(file).name;
      entry[name] = `./${path.join(app.path.src.jspages, file)}`;
    }
  });

  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>",
      })
    ))
    .pipe(webpack({
      entry: entry,
      mode: app.isDev ? "development" : "production",
      devtool: app.isDev && "cheap-module-source-map",
      output: {
        filename: "[name].min.js",
      },
      resolve: {
        // alias: {
        //   '@components': path.resolve(__dirname, '..', 'src/components'),
        // },
        extensions: ['.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream())
}