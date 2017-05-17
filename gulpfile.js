const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const isparta = require('isparta');
const path = require('path');
const sequence = require('run-sequence');
const del = require('del');

const config = {
  paths: {
    src: ['src/**/*.js'],
    test: ['test/**/*test.js'],
  },
  eslint: {
    failOnError: true,
  },
  mocha: {
    reporter: 'spec',
    require: [
      './mocha.conf.js',
    ],
    timeout: 5000,
  },
};

gulp.task('nsp', function (cb) {
  $.nsp({package: path.resolve('package.json')}, cb);
});

/**
 * Runs eslint linter on source code
 * and prints a report.
 *
 * `gulp eslint`
 */
gulp.task('eslint', () =>
  gulp.src([].concat(config.paths.src, config.paths.test))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(config.eslint.failOnError, $.eslint.failAfterError()))
);

gulp.task('coverage', () => {
  process.env.NODE_ENV = 'test';
  // Initialize the babel transpiler so ES2015 files gets compiled when they're loaded
  require('babel-core/register');

  return gulp.src(config.paths.src)
    .pipe($.excludeGitignore())
    .pipe($.istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter,
    }))
    .pipe($.istanbul.hookRequire());
});

/**
 * Runs unit tests and prints out
 * a report.
 *
 * `gulp test:unit`
 */
gulp.task('test:unit', ['coverage'], (cb) => {
  let mochaErr;
  gulp.src(config.paths.test)
    .pipe($.plumber())
    .pipe($.env({
      vars: {
        NODE_ENV: 'test',
      }
    }))
    .pipe($.mocha(config.mocha))
    .pipe($.istanbul.writeReports()) // Creating the reports after tests ran
    .pipe($.istanbul.enforceThresholds({
      thresholds: {
        global: 80
      }
    })) // Enforce a coverage of at least 80%
    .on('error', (err) => {
      mochaErr = err;
      cb(mochaErr);
    })
    .on('end', () => {
      cb(mochaErr);
      process.exit();
    });
});

/**
 * Runs both unit and end to end tests, sequentially.
 *
 * `gulp test`
 */
gulp.task('test', function(cb) {
  sequence('test:unit', cb);
});

/**
 * Lints source code and runs test suite.
 * Used as a pre-commit hook.
 *
 * `gulp validate`
 */
gulp.task('validate', [
  'eslint',
  'test:unit'
]);

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('babel-files', function () {
  return gulp.src(config.paths.src)
    .pipe($.babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', function (cb) {
  sequence('clean', 'babel-files', cb);
});

/**
 *
 * Executed in install
 */
gulp.task('prepublish', ['nsp', 'babel']);

/**
 * Alias for 'validate'.
 * Default task.
 */
gulp.task('default', ['validate']);
