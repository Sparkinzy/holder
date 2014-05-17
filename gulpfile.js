var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var jshint = require('gulp-jshint');

var moment = require('moment');
var pkg = require("package.json");

var banner =
	'/*!\n\n' +
	'<%= pkg.name %> - <%= pkg.summary %>\nVersion <%= pkg.version %>+<%= build %>\n' +
	'\u00A9 <%= year %> <%= pkg.author.name %> - <%= pkg.author.url %>\n\n' +
	'Site:\t\t<%= pkg.homepage %>\n'+
	'Issues:\t\t<%= pkg.bugs.url %>\n' +
	'License:\t<%= pkg.license.url %>\n\n' +
	'*/\n';

var paths = {
	scripts: ["src/ondomready/ondomready.js", "src/polyfills.js", "src/holder.js"]
}

function build(){
	return moment().format("YYYYMMDD") + "." + (moment().diff(moment().startOf('day'), 'seconds'));
}

gulp.task('jshint', function () {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
})

gulp.task('scripts', function () {
	return gulp.src(paths.scripts)
		.pipe(concat("holder.js"))
		.pipe(uglify())
		.pipe(header(banner, {
			pkg: pkg,
			year: moment().format("YYYY"),
			build: build()
		}))
		.pipe(gulp.dest("./"))
})

gulp.task('default', ['jshint', 'scripts']);
