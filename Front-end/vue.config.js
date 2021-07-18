module.exports = {
    css: {
        extract: false,
    },
    configureWebpack: {
        output: {
            filename: 'bundle.js'
          },   
        optimization: {
            splitChunks: false
          }
    }
}