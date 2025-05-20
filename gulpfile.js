'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');

const paths = {
    html: 'src/html',
    scss: 'src/scss',
    css: 'src/css',
    img: 'src/img',
    sprite: 'src/sprite',
    sprite_css: 'src/scss/sprite/'
};

function compileSass() {
    return gulp.src(paths.scss + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            indentType: 'tab',
            indentWidth: 1
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.stream());
}

function generateSprite() {
    const spriteData = gulp.src(paths.sprite + '/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            imgPath: '../img/sprite.png',
            cssFormat: 'scss',
            padding: 5
        }));

    const imgStream = spriteData.img
        .pipe(buffer())
        .pipe(gulp.dest(paths.img));

    const cssStream = spriteData.css
        .pipe(buffer())
        .pipe(gulp.dest(paths.sprite_css));

    return merge(imgStream, cssStream);
}

function startServer(cb) {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true,
        },
    });
    cb();
}

function watchFiles() {
    gulp.watch(paths.scss + '/**/*.scss', compileSass);
    gulp.watch(paths.sprite + '/**/*.png', generateSprite);
    gulp.watch('**/*.html').on('change', browserSync.reload);
}

exports.sass = compileSass;
exports.sprite = generateSprite;
exports.serve = gulp.series(gulp.parallel(compileSass, generateSprite), startServer, watchFiles);
exports.default = gulp.series(gulp.parallel(compileSass, generateSprite), startServer, watchFiles);