let mix = require('laravel-mix');

mix
    .js("./resources/assets/js/main.tsx", "./public/js")
    .sass("./resources/assets/sass/main.scss", "./public/css")
    .disableNotifications()
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
    })
    .version();
