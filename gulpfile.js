const gulp = require('gulp');

const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');

const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');
const jshint = require('gulp-jshint');

const srcDirectory = 'public/assets';
const tempDirectory = 'public/temp';
const outputDirectory = 'public/dist';

// css
gulp.task('combine-css', function() {
    return gulp.src(srcDirectory + '/css/**/*.css')
        .pipe(concatCss('styles/bundle.css'))
        .pipe(gulp.dest(tempDirectory));
});

gulp.task('handle-css', [ 'combine-css' ], () => {
    // minify css
    return gulp.src(tempDirectory + '/styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(outputDirectory + '/styles'));
});

// fonts
gulp.task('handle-fonts', function() {
    gulp.src(srcDirectory + '/fonts/**.*')
        .pipe(gulp.dest(outputDirectory + '/fonts'));
});

// images
gulp.task('handle-image', function() {
    gulp.src(srcDirectory + '/images/**.*')
        .pipe(gulp.dest(outputDirectory + '/images'));
});

// javascript
// libs
const jsLibPaths = [
    'public/assets/js/libs/jquery/dist/jquery.min.js',
    'public/assets/js/libs/sammy/lib/sammy.js',
    'public/assets/js/libs/handlebars/handlebars.js',
    'public/assets/js/libs/jquery-ui/jquery-ui.min.js',
    'public/assets/js/libs/underscore/underscore-min.js'
];

gulp.task('combine-js-libs', function() {
    return gulp.src(jsLibPaths)
      .pipe(concat('bundle-libs.js'))
      .pipe(gulp.dest(outputDirectory + '/scripts'));
});

// app
const appJsPaths = [
    'public/assets/js/src/helpers/general-helper.js',
    'public/assets/js/src/helpers/authentication-helper.js',
    'public/assets/js/src/data/index.js',
    'public/assets/js/src/data/vehicles-data.js',
    'public/assets/js/src/data/maintenances-data.js',
    'public/assets/js/src/data/supplies-data.js',
    'public/assets/js/src/data/checks-data.js',
    'public/assets/js/src/data/cache-data.js',
    'public/assets/js/src/controllers/login-controller.js',
    'public/assets/js/src/controllers/home-controller.js',
    'public/assets/js/src/controllers/header-controller.js',
    'public/assets/js/src/controllers/footer-controller.js',
    'public/assets/js/src/controllers/vehicles-controller.js',
    'public/assets/js/src/controllers/maintenances-controller.js',
    'public/assets/js/src/controllers/supplies-controller.js',
    'public/assets/js/src/controllers/check-status-controller.js',
    'public/assets/js/src/templates.js',
    'public/assets/js/src/json-requester.js',
    'public/assets/js/src/routing.js',
    'public/assets/js/src/init.js'
];
gulp.task('combine-js', function() {
    return gulp.src(appJsPaths)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(tempDirectory + '/scripts'));
});
gulp.task('handle-app-js', [ 'combine-js' ], (cb) => {
    // minify js
    pump([
        gulp.src(tempDirectory + '/scripts/*.js'),
        babel({presets: ['es2015']}),
        uglify(),
        gulp.dest(outputDirectory + '/scripts')
    ],
    cb
    );
});
gulp.task('js-hint-app-scripts', function() {
    return gulp.src(appJsPaths)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

// client scripts
gulp.task('move-client-scripts', function() {
    gulp.src(srcDirectory + '/js/src/web/*.js')
        .pipe(gulp.dest(tempDirectory + '/scripts'));
});
gulp.task('handle-client-js', [ 'move-client-scripts' ], (cb) => {
    // minify js
    pump([
        gulp.src(tempDirectory + '/scripts/*.js'),
        babel({presets: ['es2015']}),
        uglify(),
        gulp.dest(outputDirectory + '/scripts')
    ],
    cb
    );
});
gulp.task('js-hint-client-scripts', function() {
    return gulp.src(srcDirectory + '/js/src/web/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('jshint', [ 'js-hint-app-scripts', 'js-hint-client-scripts' ]);
gulp.task('handle-js', [ 'jshint', 'combine-js-libs', 'handle-app-js', 'handle-client-js' ]);

// Default
gulp.task('default', [ 
    'handle-css',
    'handle-fonts',
    'handle-image',
    'handle-js'
], () => {
    return gulp.src([tempDirectory, 'public/asd'], {read: false})
        .pipe(clean()); // remove temp folder
});
