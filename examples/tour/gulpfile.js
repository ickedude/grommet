var gulp = require('gulp');
var webpack = require('webpack');
var gulpWebpack = require('gulp-webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var assign = require('object-assign');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('copy', function() {
  gulp.src('src/index.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  del.sync(['dist']);
});

gulp.task('preprocess', function(callback) {
  runSequence('clean', 'copy', callback);
});

var webpackConfig = {
  output: {
    filename: 'index.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'src/js'),
      path.resolve(__dirname, 'src/scss'),
      path.resolve(__dirname, '../../src/js'),
      path.resolve(__dirname, '../../src/lib'),
      path.resolve(__dirname, '../../src/scss'),
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../../node_modules')
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpeg' },
      { test: /\.scss$/,loader: 'style!css!sass?outputStyle=expanded'},
    ]
  }
};

gulp.task('dev', ['preprocess'], function() {
    var devWebpackConfig = assign({}, webpackConfig, {
      entry: {
        app: ['webpack/hot/dev-server', './src/js/index.js'],
        styles: ['webpack/hot/dev-server',  './src/scss/index.scss']
      },

      output: {
        filename: 'index.js',
        path: __dirname + 'dist/'
      },

      devtool: 'inline-source-map',

      plugins: [ new webpack.HotModuleReplacementPlugin() ]

    });

    new WebpackDevServer(webpack(devWebpackConfig), {
      contentBase: "dist",
      hot: true,
      inline: true,
      stats: { colors: true }
    }).listen(8081, "localhost");

});

gulp.task('dist', function() {
    return gulp.src('docs/index.js')
           .pipe(gulpWebpack(docWebpackConfig))
           .pipe(gulp.dest('dist/doc'));
});


/*
gulp.task('copy', function() {
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'));
  gulp.src('./src/img/*')
    .pipe(gulp.dest('./dist/img'));
  gulp.src('./node_modules/ligo/src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'));
});

gulp.task('sass', function() {
  return sass('src/scss/', {
    loadPath: [
      'node_modules/ligo/src/scss',
      'bower_components'
    ],
    style: 'compact'
  })
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(gulp.dest('dist/css'));
});

gulp.task('dev', function () {
  gulp.watch(['./src/scss/*.scss', './node_modules/ligo/src/scss/** /*.scss'], ['sass']);
});

gulp.task('prerender', function () {
  return gulp.src('src/js/login.js')
      .pipe(render({template: 'src/_template.html'}))
      .pipe(gulp.dest('dist'));
});
*/