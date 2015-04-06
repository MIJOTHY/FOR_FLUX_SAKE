var gulp        = require("gulp");
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');

gulp.task('browserify', function() { // Defining our gulp task for running browserify
    var bundler = browserify({
        entries: ['./src/main.js'], // Our entry point is the main.js file in the src folder 
        transform: [reactify], // Since we're writing JSX, we need to transform the build output back to js
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        var updateStart = Date.now();
        console.log('Updating!');
        watcher.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build/')); // We want our output file to be placed in the build folder
        console.log('Updated! That took ', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

// If we just type 'gulp' in the terminal, it performs the default action.
gulp.task("default", ["browserify"]);