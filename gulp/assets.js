import gulp from 'gulp';
import newer from 'gulp-newer';
import { paths } from './paths.js';

export function assets() {
  return gulp.src(paths.assets.src, { encoding: false })
    .pipe(newer(paths.assets.dest))
    .pipe(gulp.dest(paths.assets.dest));
}

export function publicFiles() {
  return gulp.src(paths.public.src, { encoding: false })
    .pipe(newer(paths.public.dest))
    .pipe(gulp.dest(paths.public.dest));
}
