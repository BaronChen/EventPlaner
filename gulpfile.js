var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var exec = require('child_process').exec;
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var open = require('gulp-open');

var config = require('./gulpfile.config')();


gulp.task('default', function() {

});

gulp.task('test', function() {
    gutil.log('Hello World!')
});

gulp.task('copy-server-code', function(params) {
    gutil.log('Copy server files...');
    var serverFiles = config.serverFiles;
    return gulp.src(serverFiles, {
        base: '.'
    }).pipe(gulp.dest('build'));

});

gulp.task('copy-html', ['build-index-prod'], function(params) {
    gutil.log('Copy html files...');
    return gulp.src(['public/**/*.html', 'public/tokenhandler/*.js', '!public/index.dev.html', '!public/index.prod.html', '!public/index.html', '!public/tests/**/*'], {
        base: 'public'
    }).pipe(gulp.dest('build/public'));
});

gulp.task('copy-css', ['build-index-prod'], function(params) {
    gutil.log('Copy css files...');
    return gulp.src(['public/**/*.css'], {
        base: 'public'
    }).pipe(gulp.dest('build/public'));
});

gulp.task('prepare-tsconfig-prod', function() {
    return gulp.src("./tsconfig.prod.json").pipe(rename('tsconfig.json')).pipe(gulp.dest('.'));
});

gulp.task('build-ts-prod', ['prepare-tsconfig-prod'], function(cb) {
    gutil.log('Compile TypeScript for PROD...');
    exec('npm run tsc:single', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('clean-ts', function() {
    gutil.log('cleaning compiled JavaScript...');
    del(['public/**/*.js', 'public/**/*.js.map', '!public/tokenhandler/*.js']);
});

gulp.task('prepare-tsconfig-dev', function() {
    return gulp.src("./tsconfig.dev.json").pipe(rename('tsconfig.json')).pipe(gulp.dest('.'));
});

gulp.task('build-ts-dev', ['prepare-tsconfig-dev'], function(cb) {
    gutil.log('Compile TypeScript for DEV...');
    exec('npm run tsc', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('build-index-dev', ['build-ts-dev'], function() {
    gutil.log('Compile index.html...');
    var target = gulp.src('public/index.dev.html');
    var sourceFiles = config.clientScriptsDev.concat(config.clientCSSDev);
    var source = gulp.src(sourceFiles, { read: false });

    return target.pipe(rename('index.html')).pipe(inject(source)).pipe(gulp.dest('public'))
});

gulp.task('build-index-prod', ['build-ts-prod'], function() {
    gutil.log('Compile index.html...');
    var target = gulp.src('public/index.prod.html');
    var sourceFiles = config.clientScriptsDev.concat(config.clientCSSDev);
    var source = gulp.src(sourceFiles, { read: false });

    return target.pipe(rename('index.html')).pipe(inject(source)).pipe(gulp.dest('build/public'))
});

gulp.task('minify-js', ['build-ts-prod'], function() {
    gutil.log('minify js for prod...');
    //mangle fundction and variable names will break the current version of angular 2...
    gulp.src('public/main.js').pipe(uglify({
        mangle: false
    })).pipe(gulp.dest('build/public'));

});

gulp.task('clean-ts-prod', ['minify-js'], function() {
    del(['public/main.js']);
});



gulp.task('build-dev', ['clean-ts', 'prepare-tsconfig-dev', 'build-ts-dev', 'build-index-dev']);
gulp.task('build-prod', ['copy-server-code', 'clean-ts', 'prepare-tsconfig-prod', 'build-ts-prod', 'build-index-prod', 'copy-html', 'copy-css', 'minify-js', 'clean-ts-prod']);

//unit tests
var mocha = require('gulp-mocha');
gulp.task('unit-tests-backend', function() {
    return gulp.src('test/unit/*.js', { read: false })
        .pipe(mocha());
});

gulp.task('unit-tests-jasmine', ['build-ts-dev'], function() {
    var options = {
        uri: 'http://localhost:8080/public/tests/unit-tests.html',
        app: 'chrome'
    };
    gulp.src(__filename).pipe(open(options));
})

var server = require('karma').Server;
gulp.task('unit-tests-karma', function(done) {
    new server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('generate-coverage', ['unit-tests-karma'], function(cb) {
    gutil.log('Generating coverage report...');
    exec('npm run generate-coverage', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('show-coverage', ['generate-coverage'], function(){
     var options = {
        uri: 'file:///'+ __dirname +'/coverage/index.html',
        app: 'chrome'
    };
    gulp.src(__filename).pipe(open(options));
});

gulp.task('unit-tests-frontend',['unit-tests-karma', 'generate-coverage', 'show-coverage'], function(){
    gutil.log('Done. Check the open browser for detail.')
});