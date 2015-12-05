var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var PATHS = {
    dest: './dist',
    lib: './dist/bower_components',
    src: {
        js: './src/**/*.js',
        css: './src/**/*.css',
        html: './src/**/*.html',
        exclude: '!./src/bower_components/**/*'
    },
    libs: [
        './src/bower_components/**/*'
    ]
};

gulp.task('clean', function(done) {
    return del([PATHS.dest],{force: true}, done);
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html)
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('libs', function () {
    return gulp.src(PATHS.libs)
        .pipe(gulp.dest(PATHS.lib));
});

gulp.task('css', function () {
    return gulp.src(PATHS.src.css)
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('js', function () {
    return gulp.src(PATHS.src.js)
        .pipe(gulp.dest(PATHS.dest));
});

gulp.task('dev', ['default'], function () {
    var bs = require("browser-sync").create();
    gulp.watch([PATHS.src.html, PATHS.src.exclude], ['html']);
    gulp.watch([PATHS.src.css, PATHS.src.exclude], ['css']);
    gulp.watch([PATHS.src.css, PATHS.src.exclude], ['css']);
    bs.init({
        server: "dist",
        index: 'index.html',
        port: 9000,
        files: "**/*.html, **/**/*.html, **/*.js, **/*.css, !dist/bower_components/**/*.*",
        notify: false
    })
});

gulp.task('default', function(){
    runSequence('clean', ['html', 'js', 'css', 'libs']);
});
