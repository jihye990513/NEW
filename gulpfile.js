'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var spritesmith = require('gulp.spritesmith');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: 1,
            sourceComments: false,
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('src/sprite/*.png') // 스프라이트 이미지 경로
    .pipe(spritesmith({
        imgName: 'sp_all.png',
        padding: 10,
        cssName: '_sp_all.scss'
    })); 
    spriteData.img.pipe(gulp.dest('src/img')); // 스프라이트된 이미지 저장 경로
    spriteData.css.pipe(gulp.dest('src/scss/sprite')); // 스프라이트 scss 경로
});
