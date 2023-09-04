/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = (knex) => {
    return knex.schema.createTable('pets', (table) => {
        table.increments('id').primary();
        table.string('pet_name').notNullable();
        table.string('species').notNullable();
        table.integer('happy_level').notNullable
        table.integer('clean_level').notNullable
        table.integer('energy_level').notNullable
        table.integer('hunger_level').notNullable
        table.integer('owner_id').notNullable();
        table.foreign('owner_id').references('id').inTable('users');
    });
   };
   
   
   exports.down = (knex) => {
    return knex.schema.dropTable('pets');
   };
