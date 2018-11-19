const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const babel = require("gulp-babel");
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

const browsers = [
  'ie >= 10',
  'Firefox >= 11',
  'Chrome >= 18',
  'Safari >= 6',
  'Opera >= 12.1',
];
const paths = {
  dist: 'assets',
  src: {
    image: 'src/**/*.+(png|jpg|jpeg|svg|ico)',
    sass: 'src/**/**/*.scss',
    js: 'src/**/**/*.js',
    fonts: 'src/**/**/*.+(eot|ttf|woff|woff2|svg)',
  },
};

gulp.task('sass', () => {
  gulp.src(paths.src.sass)
    .pipe(sass().on('error', notify.onError({
      message: '<%= error.message %>',
      title: 'Sass Error!',
    })))
    .pipe(autoprefixer({
      browsers,
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('scripts', () => {
  gulp.src(paths.src.js)
    .pipe(babel().on('error', notify.onError({
      message: '<%= error.message %>',
      title: 'Babel Error!',
    })))
    .pipe(minify({
      ext:{
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.src.image)
    .pipe(gulp.dest(paths.dist))
});

gulp.task('fonts', () => {
  gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist))
});

// Default task
gulp.task('default', ['sass', 'scripts', 'images', 'fonts'], () => {
  gulp.watch(paths.src.js, ['scripts']);
  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.image, ['images']);
  gulp.watch(paths.src.fonts, ['fonts']);
});

gulp.task('del', () => del.sync(paths.dist));
