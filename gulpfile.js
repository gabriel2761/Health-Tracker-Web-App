var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inlinesource = require('gulp-inline-source');

gulp.task('default', function() {

});

gulp.task('inlinesource', function() {
    return gulp.src('src/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});