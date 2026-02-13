import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gulpIf from 'gulp-if';
import { paths } from './paths.js';

const sassCompiler = gulpSass(sass);

export function scss(bs, isProd) {
  function scssTask() {
    return gulp.src(paths.scss.src)
      .pipe(sassCompiler().on('error', sassCompiler.logError))
      .pipe(autoprefixer())
      .pipe(gulpIf(isProd(), cleanCSS()))
      .pipe(gulp.dest(paths.scss.dest))
      .pipe(bs.stream());
  }
  return scssTask;
}
