import gulp from 'gulp'
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'
import { server } from './gulp/tasks/server.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { styles } from './gulp/tasks/styles.js'
import { scripts } from './gulp/tasks/scripts.js'
import { images } from './gulp/tasks/images.js'
import { copy } from './gulp/tasks/copy.js'
import { iconStyle } from './gulp/tasks/iconStyle.js'
import { otfToTtf, fontsStyle, ttfToWoff } from './gulp/tasks/fonts.js'

global.app = {
    path,
    gulp,
    plugins,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build')
}


const watch = () => {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.styles, styles)
    gulp.watch(path.watch.scripts, scripts)
    gulp.watch(path.watch.images, images)
    gulp.watch(path.watch.iconStyle, iconStyle)
    gulp.watch(path.watch.files, copy)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

const mainTasks = gulp.series(fonts, iconStyle, gulp.parallel(html, copy, styles, scripts, images))

export const dev = gulp.series(reset, mainTasks, gulp.parallel(watch, server))
export const build = gulp.series(reset, mainTasks)

gulp.task('default', dev)
