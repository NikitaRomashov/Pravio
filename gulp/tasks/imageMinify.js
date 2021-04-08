const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// Минификация и оптимизация изображений

module.exports = function imageMinify() {
  return gulp.src(
    ['dev/static/images/**/**/*.{gif,png,jpg,svg,webp}',
    '!dev/static/images/sprite/**/*']
  )
    .pipe(buffer())
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/static/images/'))
    .pipe(webp({
          quality: 70
    }))
    .pipe(gulp.dest('dist/static/images/'))
};
