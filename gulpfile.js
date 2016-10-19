/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-cache del gulp.spritesmith browser-sync gulp-sourcemaps --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    spritesmith = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    bs = require('browser-sync'),
    del = require('del');

// Source folder structure
// images/*, styles/main.scss, sprites, scripts
// Outputs to
// images/*, styles/main.css, main.min.css | scripts/main.js, *, *.min.js
// Sprites will output to source/images folder and will be processed and exported to dist/images folder.
// Environmental Variables
var
    // sourcefolder
    src = '',
    // site url for proxy
    url = '',
    // watch files
    // ex **/* for all files, *.css for css files etc.
    files = [],
    // distribution destination
    dist = '';


// Styles
gulp.task('styles', function() {
  return sass(src+'/styles/main.scss', {})
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist+'/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist+'/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Sprites
gulp.task('sprite', function () {
    var spriteData = gulp.src(src+'/sprites/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '../images/sprite.png',
            cssName: '_sprite.scss',
            padding: 20
        }));
    spriteData.img.pipe(gulp.dest(src+'/images'));
    spriteData.css.pipe(gulp.dest(src+'/styles'));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(src+'/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist+'/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(dist+'/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src(src+'/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(dist+'/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
  // return del([dist+'/styles', dist+'/scripts', dist+'/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('sprite','styles', 'scripts', 'images');
});

// Browser sync
gulp.task('browser-sync', ['styles'], function() {
  bs.init({
    proxy: url
  });
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

  // Watch .scss files
  gulp.watch(src+'/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch(src+'/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch(src+'/images/**/*', ['images']);

  // Watch sprites
  gulp.watch(src+'/sprites/**/*.png', ['sprite']);

  // Watch any files in dist/, reload on change
  gulp.watch(files).on('change', bs.reload);

});
