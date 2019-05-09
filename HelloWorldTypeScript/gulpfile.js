/// <binding BeforeBuild='copy' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";


gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
gulp.task("clean", gulp.series(["clean:js", "clean:css"]));

gulp.task("copy:scripts", () => {
    return gulp.src(["./Scripts/**/*.js"], { base: "./Scripts" })
        .pipe(gulp.dest("./wwwroot/js"));
});

gulp.task("scripts", () => {
    return gulp.src(["./Scripts/**/*.js"], { base: "./Scripts" })
        .pipe(gulp.dest("./wwwroot/js"))
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});


gulp.task("copy:lib:jquery", () => {
    return gulp.src(["./node_modules/jquery/dist/*.js"], { base: "./node_modules/jquery/dist" })
        .pipe(gulp.dest("./wwwroot/lib/jquery"));
});

gulp.task("copy:lib", gulp.series(["copy:lib:jquery"]));

gulp.task("copy", gulp.series(["copy:scripts", "copy:lib"]));

gulp.task("min:js", () => {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", () => {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", gulp.series(["min:js", "min:css"]));

// A 'default' task is required by Gulp v4
gulp.task("default", gulp.series(["min"]));