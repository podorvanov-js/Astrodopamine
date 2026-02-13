import gulp from 'gulp';
import browserSync from 'browser-sync';
import { paths } from './paths.js';

export const bs = browserSync.create();

export function serve(htmlTask, scssTask, jsTask, imagesTask, assetsTask) {
  function watch() {
    bs.init({
      server: { baseDir: 'dist' },
      notify: false,
      open: false
    });

    gulp.watch(paths.html.watch, htmlTask);
    gulp.watch(paths.scss.watch, scssTask);
    gulp.watch(paths.js.src, jsTask);
    gulp.watch(paths.images.src, imagesTask);
    gulp.watch(paths.assets.src, assetsTask);
  }
  return watch;
}
