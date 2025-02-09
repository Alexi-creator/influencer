export const vendorCSS = () => {
  const modules = [
    `node_modules/swiper/swiper-bundle.min.css`,
    `node_modules/nouislider/dist/nouislider.min.css`,
    `node_modules/cropperjs/dist/cropper.min.css`,
    `node_modules/tippy.js/dist/tippy.css`,
  ];

  return app.gulp.src(modules)
    .pipe(app.gulp.dest(`${app.path.srcFolder}/scss/vendors`));
};
