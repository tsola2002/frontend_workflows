//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];

var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];

var htmlSources = ['builds/development/*.html'];

var jsonSources = ['builds/development/js/*.json'];

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
        //do a reload on the server
        .pipe(connect.reload())
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
        //do a reload on the server
        .pipe(connect.reload())
});


gulp.task('watch', function() {
    //when any coffeSources file changes run coffee method
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    //when any file with a .scss extension changes, we run the compass task
    gulp.watch('components/sass/*.scss', ['compass']);
    //when any html file changes do a livereload
    gulp.watch(htmlSources, ['html']);
    //when any json file changes do a livereload
    gulp.watch(jsonSources, ['json']);

});

gulp.task('connect', function() {
    //use connect variable's of the server method to create a server
    connect.server({
        //specify the root of your application
        root: 'builds/development/',
        //turn on livereload feature
        livereload: true
    });
});

gulp.task('html', function() {
    //set input sources to html files
    gulp.src(htmlSources)
    //pipe the sources to livereload
        .pipe(connect.reload())
});

gulp.task('json', function() {
    //set input sources to json files
    gulp.src(jsonSources)
    //pipe the sources to livereload
        .pipe(connect.reload())
});

//custom gulp task to run all tasks
gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch'])