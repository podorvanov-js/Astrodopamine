import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import { Transform } from 'stream';
import { paths } from './paths.js';

function fixJsonTrailingCommas() {
	return new Transform({
		objectMode: true,
		transform(file, enc, cb) {
			if (file.isBuffer()) {
				const fixed = file.contents.toString().replace(/,(\s*\n\s*\])/g, '$1');
				file.contents = Buffer.from(fixed);
			}
			cb(null, file);
		}
	});
}

export function html(bs) {
	function htmlTask() {
		return gulp.src(paths.html.src)
			.pipe(fileInclude({
				prefix: '@@',
				basepath: 'src/html/includes'
			}))
			.pipe(fixJsonTrailingCommas())
			.pipe(gulp.dest(paths.html.dest))
			.pipe(bs.stream());
	}
	return htmlTask;
}