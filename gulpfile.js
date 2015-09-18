var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    sourceFile = 'app.js',
    destFolder = './public/js/',
    destFile = 'compiled.js';

  gulp.task('browserify', function() {
    return browserify(sourceFile)
    .bundle()
    .pipe(source(destFile))
    .pipe(gulp.dest(destFolder));
  });

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
