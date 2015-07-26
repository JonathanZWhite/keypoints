var distPath = './dist/';

module.exports = {
    entry: './background.js',
    output: {
        filename:  distPath + 'bundle.js'
    }
};
