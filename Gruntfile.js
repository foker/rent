var config = require('./config');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        knexmigrate: {
            config: {
                directory: './migrate',
                tableName: 'knex_migrations',
                database: {
                    client: 'pg',
                    connection: config.pgsql.connection
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-knex-migrate');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);

};