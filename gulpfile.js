/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */
 
// Load plugins
var gulp = require('gulp'),
    lr,
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    open = require("gulp-open"),
    gutil = require('gulp-util');
 
// Styles
gulp.task('styles', function() {
  return sass('./assets-src/scss', {style: 'expanded'} )
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./assets/css'))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
});
// JS Plugins
// These don't need to be linted.
gulp.task('plugins', function() {
  return gulp.src('assets-src/js/plugins/*.js')
    .pipe(gulp.dest('assets/js/plugins'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('assets/js/plugins'))
});
 
// Scripts
gulp.task('scripts', function() {
  return gulp.src('assets-src/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    //.pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('assets/js'))
});

// Images
gulp.task('images', function() {
  return gulp.src('assets-src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
});
// Fonts
gulp.task('fonts', function() {
  return gulp.src('assets-src/fonts/**/*')
    .pipe(gulp.dest('assets/fonts'))
});
 
// Clear Gulp Cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

// Clean
gulp.task('clean', function(cb) {
    del(['assets/css/**/*', 'assets/js/**/*', 'assets/images/**/*'], cb)
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('clear', 'styles', 'plugins', 'scripts', 'images');
});

// For a non minified build
gulp.task('dev', ['clean','watch'], function() {
    gulp.start('clear', 'styles', 'plugins', 'scripts',  'images');    
});
 
// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('assets-src/scss/**/*.scss', ['styles']);
   
  // Watch .js plugin files
  gulp.watch('assets-src/js/plugins/*.js', ['plugins']);

  // Watch .js files
  gulp.watch('assets-src/js/**/*.js', ['scripts']);
 
  // Watch image files
  // gulp.watch('assets-src/images/**/*', ['images']);
 

});