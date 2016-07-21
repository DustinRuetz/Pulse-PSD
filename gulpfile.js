// required npm modules
const gulp = require("gulp"),
		inlineSVG = require("gulp-inline"),
		sass = require("gulp-sass"),
		babel = require("gulp-babel");

// default tasks to run on "gulp" command
gulp.task("default", [
	"compileMarkup",
	"copyImages",
	"ES6toES5"
], () => {
	// files to watch and tasks to run
	gulp.watch("dev/*.html", ["compileMarkup"]);
	gulp.watch("dev/img/*.*", ["copyImages"]);
	gulp.watch("dev/scripts/*.js", ["ES6toES5"]);
});

// compileMarkup task
// 1) pipes all HTML from dev/ to public/
// 2) converts image SVGs to inline SVGs
gulp.task("compileMarkup", () => {
	return gulp.src("dev/*.html")
		.pipe(inlineSVG({
			base: "icons",
			disabledTypes: ["css", "js", "img"]
		}))
		.pipe(gulp.dest("public"));
});

// copyImages task
// 1) pipes all images in dev/img/ to public/img/
gulp.task("copyImages", () => {
	return gulp.src("dev/img/*.*")
		.pipe(gulp.dest("public/img"));
});

// ES6toES5 task
// 1) pipes all JS from dev/ into babel
// 2) babel transpiles ES6 to ES5
// 3) babel pipes to public/
gulp.task("ES6toES5", () => {
	return gulp.src("dev/scripts/*.js")
		.pipe(babel({
			presets: ["es2015"]
		}))
		.pipe(gulp.dest("public/scripts"));
});