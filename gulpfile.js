const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//HTML Minifier

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
}

exports.html = html;

//Js

const jsmin = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
}

exports.jsmin = jsmin;

//Image

const optimizeImages = () => {
  return gulp.src("source/img/**")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))
}

exports.optimizeImages = optimizeImages;

//Fonts

const copyFonts = () => {
  return gulp.src("source/fonts/*.{woff, woff2}")
    .pipe(gulp.dest("build/fonts"))
}

exports.copyFonts = copyFonts;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

const clean = () => {
  return del("build");
};


const build = gulp.series(
  copyFonts,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    jsmin,
  ),
);

exports.build = build;

exports.default = gulp.series(
  copyFonts,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    jsmin,
  ),
  gulp.series(
    server,
    watcher
  ));
