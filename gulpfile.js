import gulp from 'gulp';
import { deleteAsync } from 'del';
import { bs, serve } from './gulp/server.js';
import { html } from './gulp/html.js';
import { scss } from './gulp/scss.js';
import { js } from './gulp/js.js';
import { images, toWebp, imagesMobile, toWebpMobile } from './gulp/images.js';
import { assets } from './gulp/assets.js';

let isProduction = false;

const htmlTask = html(bs);
const scssTask = scss(bs, () => isProduction);
const jsTask = js(bs, () => isProduction);
const allImages = gulp.parallel(images, toWebp, imagesMobile, toWebpMobile);

function clean() {
  return deleteAsync(['dist']);
}

function setProduction(done) {
  isProduction = true;
  done();
}

const compile = gulp.parallel(htmlTask, scssTask, jsTask, allImages, assets);
const watch = serve(htmlTask, scssTask, jsTask, allImages, assets);

export const backend = gulp.series(clean, compile);
export const build = gulp.series(setProduction, clean, compile);
export default gulp.series(clean, compile, watch);
