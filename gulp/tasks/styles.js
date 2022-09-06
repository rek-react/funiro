import gulpSass from 'gulp-sass'
import defaultSass from 'sass'

import cleanCss from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(defaultSass)

export const styles = () => {
    return app.gulp.src(app.path.src.styles, { sourcemap: app.isDev })
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.gulpIf(app.isBuild, groupCssMediaQueries())
        )
        .pipe(
            app.plugins.gulpIf(app.isBuild, autoprefixer({
                grid: true,
                cascade: true,
                overrideBrowserslist: ["last 3 versions"]
            }))
        )
        .pipe(
            app.plugins.gulpIf(app.isBuild, cleanCss())
        )
        .pipe(app.plugins.rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.styles))
        .pipe(app.plugins.browserSync.stream())
}