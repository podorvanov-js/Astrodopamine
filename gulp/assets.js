import gulp from 'gulp';
import newer from 'gulp-newer';
import { paths } from './paths.js';

export function publicFiles() {
  return gulp.src(paths.public.src, { encoding: false })
    .pipe(newer(paths.public.dest))
    .pipe(gulp.dest(paths.public.dest));
}