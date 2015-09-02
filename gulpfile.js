require('harmonize')(['harmony-proxies']);
require('babel/register');

var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var mocha = require('gulp-mocha');
var uglifier = require("node-uglifier");

gulp.task('babel', function () { 
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task('test', ['babel'], function () {
	return gulp.src('dist/**/*.spec.js', { read: false})
		.pipe(mocha());
});

gulp.task('build', ['babel'], function() {
	new uglifier("./shim.js")
		.merge()
		.uglify()
		.exportToFile("./main.js");

	new uglifier("./dist/index.js")
		.merge()
		.uglify()
		.exportToFile("./no-shim.js");

});

gulp.task('watch', function() { 
    gulp.watch(["src/**/*.js", "test/**/*.spec.js"], ['test']);
});

gulp.task('default', ['watch']); 