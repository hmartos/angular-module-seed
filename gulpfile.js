//Requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

//Vars
var dist = 'dist';
var jsFile = 'my-module.js';
var minJsFile = 'my-module.min.js';
var minCssFile = 'my-module.min.css';

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
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat(minCssFile))
    .pipe(gulp.dest(dist));
});

gulp.task('default', ['concat-js', 'concat-uglify-js', 'minify-css']);
gulp.task('build', ['default']);