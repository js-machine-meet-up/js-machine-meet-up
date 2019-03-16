const gulp = require('gulp');
const purgecss = require('gulp-purgecss');

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
