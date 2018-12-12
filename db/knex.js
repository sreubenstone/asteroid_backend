
module.exports = {
    development: {
        client: "pg",
        connection: 'postgres://localhost/asteroid',
        migrations: {
            directory: "./db/migrations"
        },
        seeds: {
            directory: "./db/seeds/dev"
        },
        useNullAsDefault: true
    },

    test: {
        client: "pg",
        connection: "postgres://localhost/asteroid",
        migrations: {
            directory: "./db/migrations"
        },
        seeds: {
            directory: "./db/seeds/test"
        },
        useNullAsDefault: true
    },

    production: {
        client: "pg",
        connection: process.env.PGCONNECTSTRING,
        migrations: {
            directory: "./db/migrations"
        },
        seeds: {
            directory: "./db/seeds/production"
        },
        useNullAsDefault: true
    }
};