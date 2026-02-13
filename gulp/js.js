import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import terser from 'gulp-terser';
import gulpIf from 'gulp-if';
import { paths } from './paths.js';

export function js(bs, isProd) {
  function jsTask() {
    return gulp.src(paths.js.src)
      .pipe(webpackStream({
        mode: 'none',
        output: { filename: 'main.js' },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
        }
      }))
      .pipe(gulpIf(isProd(), terser()))
      .pipe(gulp.dest(paths.js.dest))
      .pipe(bs.stream());
  }
  return jsTask;
}
