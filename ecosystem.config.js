module.exports = {
    apps: [
        {
            name: 'sas-aqua-api',
            script: './server.js',
            instances: 1,
            autorestart: true,
        },
        {
            name: 'sas-aqua-react',
            script: 'serve -s react/build -p 60500',
        }
    ]
}