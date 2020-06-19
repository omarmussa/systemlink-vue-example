module.exports = {
    configureWebpack:{
        output: {
            filename: 'js/exampleplugin.js'
        }
    },
    publicPath: '/plugins/vue_example_plugin/',
    devServer: 
    {
        proxy: {
            '/nifile': {
                target: 'http://localhost/',
                secure: false
            },

            '/nitestmonitor': {
                target: 'http://localhost/',
                secure: false
            }
        }
    }
}