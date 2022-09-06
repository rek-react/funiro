import cleanCSS from "gulp-clean-css"

export const iconStyle = () => {
    return app.gulp.src(app.path.src.iconStyle)
        .pipe(
            app.plugins.gulpIf(app.isBuild, cleanCSS())
        )
        .pipe(app.plugins.rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.iconStyle))
        .pipe(app.plugins.browserSync.stream())
}