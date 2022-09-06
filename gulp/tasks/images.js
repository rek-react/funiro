import imagemin from "gulp-imagemin"

export const images = () => {
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.plugins.gulpIf(app.isBuild, imagemin({
            progressive: true,
            interlaced: true,
            optimizationLever: 3
        })))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream())
}