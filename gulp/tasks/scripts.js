import webpack from 'webpack-stream'

export const scripts = () => {
    return app.gulp.src(app.path.src.scripts, { sourcemap: app.isDev })
        .pipe(webpack({
            mode: app.isDev ? 'development' : 'production',

            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        resolve: {
                            fullySpecified: false
                        },
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-proposal-object-rest-spread']
                            }
                        }
                    }
                ]
            },
            output: {
                filename: 'script.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.scripts))
        .pipe(app.plugins.browserSync.stream())
}