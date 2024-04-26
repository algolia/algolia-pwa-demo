import config from '@salesforce/pwa-kit-dev/configs/webpack/config'

// Add or update the rule for CSS processing
config.forEach((cnf) => {
    if (cnf.module && cnf.module.rules) {
        cnf.module.rules.push({
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        })
    } else {
        cnf.module = {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                }
            ]
        }
    }
})

module.exports = config
