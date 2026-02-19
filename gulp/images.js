import gulp from 'gulp';
import newer from 'gulp-newer';
import sharpModule from 'sharp';
import path from 'path';
import { Transform } from 'stream';
import { paths } from './paths.js';

function resize(scale, suffix) {
  return new Transform({
    objectMode: true,
    async transform(file, _, callback) {
      if (file.isNull() || file.isStream()) return callback(null, file);
      const ext = path.extname(file.path).toLowerCase();
      if (ext === '.svg' || ext === '.gif') return callback(null, file);
      try {
        const metadata = await sharpModule(file.contents).metadata();
        const newWidth = Math.round(metadata.width * scale);
        file.contents = await sharpModule(file.contents).resize(newWidth).toBuffer();
        const ext = path.extname(file.path);
        file.path = file.path.slice(0, -ext.length) + suffix + ext;
        callback(null, file);
      } catch (err) {
        callback(err);
      }
    }
  });
}

function optimizeImages() {
  return new Transform({
    objectMode: true,
    async transform(file, _, callback) {
      if (file.isNull() || file.isStream()) return callback(null, file);
      try {
        const ext = path.extname(file.path).toLowerCase();
        let pipeline = sharpModule(file.contents);
        if (ext === '.jpg' || ext === '.jpeg') {
          pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
        } else if (ext === '.png') {
          pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
        } else if (ext === '.svg' || ext === '.gif') {
          return callback(null, file);
        }
        file.contents = await pipeline.toBuffer();
        callback(null, file);
      } catch (err) {
        callback(err);
      }
    }
  });
}

function toWebpTransform(quality) {
  return new Transform({
    objectMode: true,
    async transform(file, _, callback) {
      if (file.isNull() || file.isStream()) return callback(null, file);
      const ext = path.extname(file.path).toLowerCase();
      if (ext === '.svg' || ext === '.gif') return callback();
      try {
        file.contents = await sharpModule(file.contents)
          .webp({ quality })
          .toBuffer();
        const ext = path.extname(file.path);
        file.path = file.path.slice(0, -ext.length) + '.webp';
        callback(null, file);
      } catch (err) {
        callback(err);
      }
    }
  });
}

export function images() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(newer(paths.images.dest))
    .pipe(optimizeImages())
    .pipe(gulp.dest(paths.images.dest));
}

export function toWebp() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(newer({ dest: paths.images.dest, ext: '.webp' }))
    .pipe(toWebpTransform(80))
    .pipe(gulp.dest(paths.images.dest));
}

export function imagesMobile() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(newer({ dest: paths.images.dest, map: (p) => { const ext = path.extname(p); return p.slice(0, -ext.length) + '@1x' + ext; } }))
    .pipe(resize(0.5, '@1x'))
    .pipe(optimizeImages())
    .pipe(gulp.dest(paths.images.dest));
}

export function toWebpMobile() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(newer({ dest: paths.images.dest, ext: '@1x.webp' }))
    .pipe(resize(0.5, '@1x'))
    .pipe(toWebpTransform(80))
    .pipe(gulp.dest(paths.images.dest));
}