export const paths = {
  html: {
    src: 'src/html/pages/**/*.html',
    watch: 'src/html/**/*.html',
    dest: 'dist'
  },
  scss: {
    src: 'src/scss/main.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/main.js',
    watch: ['src/js/**/*.js', 'src/data/**/*.json'],
    dest: 'dist/js'
  },
  images: {
    src: 'src/images/**/*.{jpg,jpeg,png,gif,svg,JPG,JPEG,PNG}',
    dest: 'dist/images'
  },
  public: {
    src: 'src/public/**/*',
    dest: 'dist'
  }
};