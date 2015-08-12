module.exports = {
    development: {
        ports: {
            http: 3000,
            https: 8000
        },
        urls: {
            http: 'https://localhost:3000',
            https: 'https://localhost:8000'
        }
    },
    production: {
        port: {
            http: 3000,
            https: 80
        },
        urls: {
            http: 'https://keypointsapp.com:3000',
            https: 'https://keypointsapp.com'
        }
    }
}[process.env.NODE_ENV || 'development'];
