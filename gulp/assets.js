import gulp from 'gulp';
import newer from 'gulp-newer';
import { paths } from './paths.js';

export function assets() {
  return gulp.src(paths.assets.src, { encoding: false })
    .pipe(newer(paths.assets.dest))
    .pipe(gulp.dest(paths.assets.dest));
}
