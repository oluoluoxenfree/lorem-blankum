var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src(['style.scss'])
  .pipe(sass())
  .pipe(gulp.dest('./public/css'));
});

gulp.task('default', function() {
  gulp.run('sass');
  gulp.watch('style.scss', function(event) {
        gulp.run('sass');
    });
});
