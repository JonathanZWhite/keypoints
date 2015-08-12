module.exports = {
    development: {
        port: {
            http: 3000,
            https: 8000
        },
        url: {
            http: 'http://localhost:3000',
            https: 'https://localhost:8000'
        },
        cert: {
            key: 'local.key.pem',
            ca: 'local.intermediate.crt.pem',
            cert: 'local.server.crt'
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
        },
        cert: {
            key: 'myserver.key.pem',
            ca: 'intermediate.crt.pem',
            cert: 'myserver.crt.pem'
        }
    }
}[process.env.NODE_ENV || 'development'];
