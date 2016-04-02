var gulp = require('gulp'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin');

var config = {
    bowerPath: './bower_components',
    jsInPath: './input/js',
    jsOutPath: './output/js',
    sassInPath: './input/sass',
    cssOutPath: './output/css'
}

gulp.task('bower', function() {
    return bower().pipe(gulp.dest(config.bowerPath));
});

gulp.task('js', function() {
    return gulp.src([
        config.bowerPath + '/jquery/dist/jquery.js',
        config.bowerPath + '/bootstrap-sass/assets/javascripts/bootstrap.js',
        config.jsInPath + '/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.jsOutPath))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.jsOutPath))
});

gulp.task('css', function() {
    return gulp.src(config.sassInPath + '/app.scss')
    .pipe(sass({includePaths: [
        config.bowerPath + '/bootstrap-sass/assets/stylesheets'
    ]}))
    .pipe(gulp.dest(config.cssOutPath))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.cssOutPath));
});

gulp.task('watch', function() {
    gulp.watch(config.jsInPath + '/*.js', ['js']);
    gulp.watch(config.sassInPath + '/*.scss', ['css']);
});

gulp.task('default', ['bower', 'css', 'js']);