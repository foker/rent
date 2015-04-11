/**
 * Created by macbook on 31.03.15.
 */
var config = require('../config');
var knex = require('knex')({
    client: 'pg',
    connection: config.pgsql.connection
});

module.exports = knex;

