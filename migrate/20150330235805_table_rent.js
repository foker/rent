'use strict';
var fs = require('fs');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('rent', function(table){
      table.increments('id').primary();
      table.string('vk_id', 255).notNullable();
      table.text('avatar_img').notNullable();
      table.string('name', 255).notNullable();
      table.text('text').notNullable();
      table.string('hash', 32).notNullable();
      table.number('city').notNullable();
      table.number('type').notNullable();
  })
      .then(function(){
          return knex.raw(fs.readFileSync(__dirname + '/sql/rule_hash_check.sql'));
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rent');
};
