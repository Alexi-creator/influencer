export const vendorCSS = () => {
  const modules = [
    `node_modules/swiper/swiper-bundle.min.css`,
    `node_modules/nouislider/dist/nouislider.min.css`,
  ];

  return app.gulp.src(modules)
    .pipe(app.gulp.dest(`${app.path.srcFolder}/scss/vendors`));
};
