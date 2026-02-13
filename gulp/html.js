import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { paths } from './paths.js';

export function html(bs) {
  function htmlTask() {
    return gulp.src(paths.html.src)
      .pipe(fileInclude({
        prefix: '@@',
        basepath: 'src/html/includes'
      }))
      .pipe(gulp.dest(paths.html.dest))
      .pipe(bs.stream());
  }
  return htmlTask;
}
