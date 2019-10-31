const gulp = require("gulp"),
      sass = require("gulp-sass"),
      postcss = require("gulp-postcss"),
      autoprefixer = require("autoprefixer"),
      cssnano = require("cssnano"),
      sourcemaps = require("gulp-sourcemaps"),
      browserSync = require("browser-sync").create(),
      minify = require("gulp-babel-minify"),
      browserify = require("browserify"),
      source = require("vinyl-source-stream"),
      buffer = require("vinyl-buffer"),
      babelify = require("babelify");

const paths = {
    styles: {
        src: "dev/scss/**/*.scss",
        dest: "public/stylesheets"
    },
    scripts: {
      src: "dev/js/**/*.js",
      dest: "public/javascripts"
    }
};

function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return browserify({
    entries: "./dev/js/index.js",
    extensions: [".js"],
    debug: true
  })
    .transform(babelify, { presets: ["@babel/env"] })
    .bundle()
    .on("error", function(err) {
      console.error(err);
      this.emit("end");
    })
    .pipe(source("scripts.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      minify({
        mangle: {
          keepClassName: true
        }
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.scripts.dest));
}


function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
        open: false
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch("src/*.html").on('change', browserSync.reload);
}


exports.watch = watch;
exports.style = style;
exports.scripts = scripts;

var build = gulp.parallel(style, scripts, watch);

gulp.task('default', build);