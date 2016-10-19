# Perfect Gulpfile

This is a Perfect Gulpfile. This gulpfile will make most of frontend development work easier. Here are what it can do.

  - Compiles SASS, outputs minified version along with normal version and with sourcemap
  - Generates sprite and makes it easy to use
  - Checks JS errors and outputs minified and normal version with sourcemap
  - Adds Autoprefixer to SASS
  - Optimizes images
  - Has Browser Sync, so your browser refreshes upon changes.

### Setup

Prerequisites
- npm
  -  gulp
- ruby
    - gem
    - compass
```sh
$ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-cache del gulp.spritesmith browser-sync gulp-sourcemaps --save-dev
```

### Usage
Change
- src to your sourcefiles folder
- url to your actual url
- files for monitoring file changes
- dist to your destination
