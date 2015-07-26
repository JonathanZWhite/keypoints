var distPath = './dist/';

module.exports = {
    entry: {
        background: './background/background.js',
        inject: './inject/inject.js'
    },
    output: {
        filename:  distPath + '[name].bundle.js'
    }
};
