var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inlinesource = require('gulp-inline-source'),
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload');

gulp.task('default', function() {

});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/sass/main.scss', ['sass']);
    gulp.watch('src/index.html', ['minify']);
    gulp.watch('src/js/*.js', ['concat']);
});

gulp.task('concat', function() {
    return gulp.src(['src/js/model.js',
            'src/js/collection.js',
            'src/js/view.js',
            'src/js/main.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('minify', function() {
    return gulp.src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(inlinesource())
        .pipe(gulp.dest('dist/'))
        .pipe(livereload());
});

gulp.task('sass', function() {
    return gulp.src('src/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(livereload());
});