var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('default', function() {

});

gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});