var gulp         = require('gulp');
var gutil        = require('gulp-util');
var gulpif       = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');
var less         = require('gulp-less');
var concat       = require('gulp-concat');
var plumber      = require('gulp-plumber');
var buffer       = require('vinyl-buffer');
var source       = require('vinyl-source-stream');
var babelify     = require('babelify');
var browserify   = require('browserify');
var watchify     = require('watchify');
var uglify       = require('gulp-uglify');
var sourcemaps   = require('gulp-sourcemaps');
var cssimport = require("gulp-cssimport");


var production = process.env.NODE_ENV === 'production';

var dependencies = [
    'react',
    'react-dom',
    'react-router'
];


/*
 |--------------------------------------------------------------------------
 | Copy images
 |--------------------------------------------------------------------------
 */
gulp.task('images', function(){
    return gulp.src([
        'client/images/*'
    ])
    .pipe(gulp.dest('public/img'));
});

/*
 |--------------------------------------------------------------------------
 | Copy favicon
 |--------------------------------------------------------------------------
 */
gulp.task('favicon', function(){
    return gulp.src([
        'client/favicon.ico'
    ])
    .pipe(gulp.dest('public/'));
});

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
    ]).pipe(concat('vendor.js'))
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
    return browserify()
        .require(dependencies)
        .bundle()
        .pipe(source('vendor.bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], function() {
    return browserify({ entries: 'client/client.js', debug: true })
        .external(dependencies)
        .transform(babelify, {
            presets: ['es2015','stage-0', 'react'],
            plugins: ["transform-decorators-legacy"]
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif(production, uglify({ mangle: false })))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], function() {
    var bundler = watchify(browserify({ entries: 'client/client.js', debug: true }, watchify.args));
    bundler.external(dependencies);
    bundler.transform(babelify, {
            presets: ['es2015','stage-0', 'react'],
            plugins: ["transform-decorators-legacy"]
    });
    bundler.on('update', rebundle);
    return rebundle();

    function rebundle() {
        var start = Date.now();
        return bundler.bundle()
            .on('error', function(err) {
                gutil.log(gutil.colors.red(err.toString()));
            })
            .on('end', function() {
                gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
            })
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('public/js/'));
    }
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', function() {
    return gulp.src('client/stylesheets/main.less')
        .pipe(plumber())
        .pipe(less().on('error', function(err){
            console.log(err);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(cssimport({}))
        .pipe(gulpif(production, cssmin()))
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
    gulp.watch('client/stylesheets/main.less', ['styles']);
    gulp.watch('node_modules/source-sans-pro/*/SourceSansPro-Regular*', ['fonts']);
    gulp.watch('node_modules/source-sans-pro/**/SourceSansPro-Bold*', ['fonts']);
    gulp.watch('node_modules/source-sans-pro/**/SourceSansPro-It*', ['fonts']);
    gulp.watch('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*', ['bs-fonts']);
    gulp.watch('client/favicon.ico', ['favicon']);
});


/*
 |--------------------------------------------------------------------------
 | Compile fonts
 |--------------------------------------------------------------------------
 */

gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/source-sans-pro/**/SourceSansPro-Regular*',
        'node_modules/source-sans-pro/**/SourceSansPro-Bold*',
        'node_modules/source-sans-pro/**/SourceSansPro-It*',
    ])
    .pipe(gulp.dest('public/fonts'));
});

/*
 |--------------------------------------------------------------------------
 | Compile Bootstrap fonts
 |--------------------------------------------------------------------------
 */

gulp.task('bs-fonts', function() {
    return gulp.src('node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*')
    .pipe(gulp.dest('public/fonts'));
});


gulp.task('default', ['images','favicon','bs-fonts','fonts','styles', 'vendor', 'browserify-watch', 'watch']);
gulp.task('build',   ['images','favicon','bs-fonts','fonts','styles', 'vendor', 'browserify']);

