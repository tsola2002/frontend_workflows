//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];



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
        //run the browserify plugin & install dependencies
        .pipe(browserify())
        //output final file to destination folder
        .pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            //specify where sass directory is located
            sass: 'components/sass',
            //specify where images are located
            image: 'builds/development/images',
            //specify sass output style
            style: 'expanded'
        })
            //spit log message if there are any errors
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
});


gulp.task('watch', function() {
    //when any coffeSources file changes run coffee method
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    //when any file with a .scss extension changes, we run the compass task
    gulp.watch('components/sass/*.scss', ['compass']);
});

//custom gulp task to run all tasks
gulp.task('default', ['coffee', 'js', 'compass', 'watch'])