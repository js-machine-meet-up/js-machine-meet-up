const gulp = require('gulp');
const purgecss = require('gulp-purgecss');
const critical = require('critical');

gulp.task('purgecss', () => {
  return gulp
    .src('css/*.css')
    .pipe(
      purgecss({
        content: ['./index.html']
      })
    )
    .pipe(gulp.dest('css/dist/'));
});

gulp.task('critical', function (cb) {
  critical.generate({
      inline: true,
      base: './',
      src: 'index.html',
      dest: './index-critical.html',
      minify: true,
      width: 1920,
      height: 1080
  });
});
