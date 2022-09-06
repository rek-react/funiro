import browserSync from 'browser-sync'
import newer from 'gulp-newer'
import gulpIf from 'gulp-if'
import rename from 'gulp-rename'

export const plugins = {
    browserSync,
    newer,
    rename,
    gulpIf
}