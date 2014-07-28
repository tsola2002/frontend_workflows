//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util');

//use gulps task method to create tasks
gulp.task('log', function() {
  gutil.log('Workflows are awesome');
});