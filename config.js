module.exports = {
    development: {
        port: {
            http: 3000,
            https: 8000
        },
        url: {
            http: 'http://www.localhost:3000',
            https: 'https://www.localhost:8000'
        }
    },
    production: {
        port: {
            http: 3000,
            https: 80
        },
        url: {
            http: 'http://www.keypointsapp.com:3000',
            https: 'https://www.keypointsapp.com:80'
        }
    }
}[process.env.NODE_ENV || 'development'];
