var runSequence = require('run-sequence');
var gulpWebpack = require('webpack-stream');
var merge = require('lodash/object/merge');
var extend = require('lodash/object/extend');
var webpack = require('webpack');

module.exports = function(gulp, options, webpackConfig, dist) {

  gulp.task('dist-preprocess', function(callback) {
    var argv = require('yargs').argv;
    if (argv.skipPreprocess) {
      runSequence('copy', callback);
    } else if (options.distPreprocess) {
      if (process.env.CI) {
        runSequence('preprocess', options.distPreprocess, 'copy', callback);
      } else {
        runSequence('preprocess', options.distPreprocess, 'copy', 'test', callback);
      }
    } else {
      if (process.env.CI) {
        runSequence('preprocess', callback);
      } else {
        runSequence('preprocess', 'test', callback);
      }
    }
  });

  gulp.task('dist', ['dist-preprocess'], function() {
    var env = merge({
      __DEV_MODE__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }, options.env);

    var plugins = [
      new webpack.DefinePlugin(env),
      new webpack.optimize.OccurenceOrderPlugin()
      //new webpack.optimize.DedupePlugin()
    ];

    var argv = require('yargs').argv;

    if (!argv.skipMinify) {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }));
    }

    var config = extend({
      plugins: plugins
    }, webpackConfig, options.webpack || {});

    if (!config.resolve) {
      config.resolve = {};
    }

    if (options.webpack.module && options.webpack.module.loaders) {
      webpackConfig.module.loaders.forEach(function(loader) {
        config.module.loaders.push(loader);
      });
    }

    config.resolve.extensions = ['', '.js', '.json', '.htm', '.html', '.scss'];

    return gulp.src(options.mainJs)
      .pipe(gulpWebpack(config))
      .pipe(gulp.dest(dist));
  });

};
