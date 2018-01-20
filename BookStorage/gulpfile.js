var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  fileinclude = require('gulp-file-include'),
  gulpRemoveHtml = require('gulp-remove-html'),
  bourbon = require('node-bourbon'),
  ftp = require('vinyl-ftp'),
  notify = require('gulp-notify'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js'),
  webpackStream = require('webpack-stream'),
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  bundler = webpack(webpackConfig);

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './src',
    },
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        noInfo: true,
        // hot: true,
        // inline: true,
        // historyApiFallback: true,
        stats: {
          colors: true,
        },
      }),
      webpackHotMiddleware(bundler),
    ],
    files: [
      'src/css/*.css',
      'src/*.html'
    ],
    notify: false,
  });
});

gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass({
      includePaths: bourbon.includePaths,
      outputStyle: 'expand',
    }).on('error', notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('libs', function () {
  return gulp.src([
    // 'src/libs/jquery/dist/jquery.min.js',
    // 'src/libs/bootstrap/dist/js/bootstrap.min.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js'));
});

gulp.task('js', function () {
  gulp.src('src/js/index.js')
    .pipe(webpackStream(webpackConfig, webpack).on('error', notify.onError()))
    .pipe(gulp.dest('src/'))
    .pipe(browserSync.stream());
});
gulp.task('watch', ['sass', 'libs', 'js', 'browser-sync'], function () {
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      use: [pngquant()],
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('buildhtml', function () {
  gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
    }))
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('removedist', function () { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'libs'], function () {
  var buildCss = gulp.src([
    'src/css/fonts.min.css',
    'src/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));
  var buildFiles = gulp.src([
    'src/.htaccess',
  ]).pipe(gulp.dest('dist'));
  var buildFonts = gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
  var buildJs = gulp.src('src/js/**/*').pipe(gulp.dest('dist/js'));
});

gulp.task('deploy', function () {
  var conn = ftp.create({
    host: 'hostname.com',
    user: 'username',
    password: 'userpassword',
    parallel: 10,
    log: gutil.log,
  });
  var globs = [
    'dist/**',
    'dist/.htaccess',
  ];
  return gulp.src(globs, { buffer: false })
    .pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('clearcache', function () { return cache.clearAll()});

gulp.task('default', ['watch']);
