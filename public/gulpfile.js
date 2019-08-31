var gulp = require('gulp');
var sync = require('browser-sync').create();
var port = 7000;

var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src("css/sass/vertical-menu.scss")
        .pipe(sass())
        .pipe(gulp.dest("css/"))
        .pipe(sync.stream());

});

gulp.task('serve', function() {
    sync.init({
        proxy: "http://localhost/lidjenti_back/public/",
        port:port+1
    });

    gulp.watch("css/*.css").on('change', sync.reload);
    gulp.watch("js/*.js").on('change', sync.reload);
    gulp.watch("js/**/*.js").on('change', sync.reload);
    gulp.watch("css/sass/*.scss", ['sass']);

    // For Laravel
    gulp.watch("*.php").on('change', sync.reload);
    gulp.watch("../resources/views/*.php").on('change', sync.reload);
    gulp.watch("../resources/views/**/*.php").on('change', sync.reload);
    // gulp.watch("../app/Http/Controllers/*.php").on('change', sync.reload);

});

gulp.task('default', ['serve']);
