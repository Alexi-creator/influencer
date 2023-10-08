import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve())

const builderFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  // сбилженные пути
  build: {
    html: `${builderFolder}/`,
    files: `${builderFolder}/files/`,
    css: `${builderFolder}/css/`,
    js: `${builderFolder}/js/`,
    images: `${builderFolder}/img/`,
    fonts: `${builderFolder}/fonts/`,
  },
  // пути для исходников
  src: {
    // раскоментить при использовании pug и закоментить ниже строчку
    // html: `${srcFolder}/*.pug`,
    htmlPages: `${srcFolder}/html/pages/*.html`,
    html: `${srcFolder}/html/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/pages/**/*.js`,
    jspages: `${srcFolder}/js/pages/`,
    // js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  // пути по которым следит watch
  watch: {
    // раскоментить при использовании pug и закоментить нижнию строчку
    // html: `${srcFolder}/**/*.pug`,
    html: `${srcFolder}/**/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    scss: `${srcFolder}/scss/**/*.*`,
    js: `${srcFolder}/js/**/*.*`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: builderFolder,
  builderFolder: builderFolder,
  srcFolder: srcFolder,
  docsFolder: `./docs/`,
  rootFolder: rootFolder,
  ftp: `test`,
};