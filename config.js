module.exports = {
    development: {
        port: {
            http: 3000,
            https: 8000
        },
        url: {
            http: 'http://localhost:3000',
            https: 'https://localhost:8000'
        }
    },
    production: {
        port: {
            http: 3000,
            https: 80
        },
        url: {
            http: 'http://keypointsapp.com:3000',
            https: 'https://keypointsapp.com'
        }
    }
}[process.env.NODE_ENV || 'development'];
