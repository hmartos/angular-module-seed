//Requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var templateCache = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var jsReporter = require('jshint-stylish');

//Vars
var dist = 'dist';
var jsFile = 'my-module.js';
var minJsFile = 'my-module.min.js';
var minCssFile = 'my-module.min.css';

//Lint
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(jsReporter, {beep: true}))
      .pipe(jshint.reporter('fail'));
});

//Generates templates
gulp.task('templates', function () {
  return gulp.src('src/templates/*.html')
    .pipe(templateCache(jsFile, {module: 'my.module'}))
    .pipe(gulp.dest(dist));
});

//Generates my-module.js
gulp.task('concat-js', ['templates'], function () {
  	gulp.src(['src/js/**/*.js', dist + '/' + jsFile])
  	.pipe(concat(jsFile))
  	.pipe(gulp.dest(dist))
});

//Generates my-module.min.js
gulp.task('concat-uglify-js', ['templates'], function () {
  	gulp.src(['src/js/**/*.js', dist + '/' + jsFile])
  	.pipe(concat(minJsFile))
  	.pipe(uglify())
  	.pipe(gulp.dest(dist))
});

//Generates my-module.min.css
gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat(minCssFile))
    .pipe(gulp.dest(dist));
});

//Configure watch to execute build task on source changes
gulp.task('watch', function() {
    gulp.watch('src/**', ['build']);
});

gulp.task('default', ['lint', 'concat-js', 'concat-uglify-js', 'minify-css']);
gulp.task('build', ['default']);