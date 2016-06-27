module.exports = {
    development: {
        DatabaseConfig: {
            port: 27617,
            host: '::mongo host::',
            name: '::collection name::',
            user: '::db username::',
            pass: '::db password::'
            },
        EnvConfig: {
            port: 8000
            }
        },
    production: {
        DatabaseConfig: {
            port: 29017,
            host: '::mongo host::',
            name: '::collection name::',
            user: '::db username::',
            pass: '::db password::'
            },
        EnvConfig: {
            port: 3140
            }
        }
    };