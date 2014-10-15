var gulp = require('gulp'),
	changed = require('gulp-changed'),
	stylus = require('gulp-stylus'),
	csso = require('gulp-csso'),
	autoprefixer = require('gulp-autoprefixer'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	reactify = require('reactify'),
	uglify = require('gulp-uglify'),
	del = require('del'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	p = {
		jsx: './js/app.jsx',
		scss: './styles/app.scss',
		bundle: 'app.js',
		distJs: 'dist/js',
		distCss: 'dist/css'
	};


gulp.task('browser-sync', function() {
	browserSync({
		open: false,
		notify: false,
		server: {
			baseDir: './'
		}
	});
});

gulp.task('style', function() {
	return gulp.src('styles/app.styl')
		.pipe(stylus())
		.pipe(autoprefixer('last 1 version'))
		.pipe(gulp.dest('dist/css'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js', function() {
	return browserify(p.jsx)
		.transform(reactify)
		.bundle()
		.pipe(source(p.bundle))
		.pipe(buffer())
		.pipe(gulp.dest(p.distJs));
});

gulp.task('default', ['style', 'js', 'browser-sync'], function() {
	gulp.watch('styles/**/*.styl', ['style']);
	gulp.watch('js/**/*', ['js', browserSync.reload]);
});




var deploy = require('gulp-gh-pages');

gulp.task('deploy', function() {
	return gulp.src('./**/*')
		.pipe(deploy());
});
