const sourceFolder = './src'
const buildFolder = './build'

export const path = {
    src: {
        html: `${sourceFolder}/*.html`,
        scripts: `${sourceFolder}/assets/scripts/{App,script}.js`,
        styles: `${sourceFolder}/assets/styles/style.scss`,
        iconStyle: `${sourceFolder}/assets/styles/iconsfont/iconsfont.css`,
        files: `${sourceFolder}/assets/files/**/*`,
        images: `${sourceFolder}/assets/images/**/*.{jpeg,jpg,png,gif,svg}`,
    },
    build: {
        html: `${buildFolder}/`,
        scripts: `${buildFolder}/assets/scripts/`,
        iconStyle: `${buildFolder}/assets/styles/`,
        styles: `${buildFolder}/assets/styles/`,
        files: `${buildFolder}/assets/files/`,
        images: `${buildFolder}/assets/images/`,
        fonts: `${buildFolder}/assets/fonts/`
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        scripts: `${sourceFolder}/assets/scripts/**/*.js`,
        files: `${sourceFolder}/assets/files/**/*`,
        iconStyle: `${sourceFolder}/assets/styles/iconsfont/*.css`,
        styles: `${sourceFolder}/assets/styles/**/*.scss`,
        images: `${sourceFolder}/assets/images/**/*.{jpeg,jpg,png,gif}`,
    },
    scrFolder: sourceFolder,
    reset: buildFolder,
}