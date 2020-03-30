'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConductorSchema extends Schema {
  up () {
    this.create('conductors', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.boolean('is_individual')
      table.string('conductor_name').notNullable()
      table.string('conductor_docment_number').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('conductors')
  }
}

module.exports = ConductorSchema
