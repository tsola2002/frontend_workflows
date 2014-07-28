//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

//use gulps task method to create tasks
gulp.task('coffee', function() {
    //define source file
    gulp.src(coffeeSources)
        //convert cofeescript to javascript
        .pipe(coffee({ bare: true })
        //display log message incase of errors
        .on('error', gutil.log))
        //out put to destination file
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('js', function() {
    //gather input sources to be concatenated
    gulp.src(jsSources)
        //concatenate js file into a script.js file
        .pipe(concat('script.js'))
        //output final file to destination folder
        .pipe(gulp.dest('builds/development/js'))
});