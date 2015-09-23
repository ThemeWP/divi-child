// Gulp Modules
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload,
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    uglify          = require('gulp-uglify'),
    plumber         = require('gulp-plumber'),
    refreshURL      = 'http://localhost/divi/';


    // browser-sync task for starting the server.
    gulp.task('browser-sync', function() {
        //watch files
        var files = [
        './style.css',
        './**/*.php',
        './js/*.js'
        ];

        //initialize browsersync
        browserSync.init(files, {
            //browsersync with a php server
            proxy: refreshURL,
            notify: true,
            reloadDelay: 200
        });
    });


    // minify javascript
    gulp.task('js', function() {
        return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./js/min/'))
    });


    // Sass task, will run when any SCSS files change & BrowserSync
    // will auto-update browsers
    gulp.task('sass', function () {
        return gulp.src('./scss/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./'));
    });


    // Default task to be run with `gulp`
    gulp.task('default', ['sass', 'browser-sync', 'js'], function () {
        gulp.watch("./scss/**/*.scss", ['sass']);
        gulp.watch("./js/*.js", ['js']);
    });
