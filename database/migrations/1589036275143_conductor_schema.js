'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConductorSchema extends Schema {
  up () {
    this.table('conductors', (table) => {
      table.string('conductor_docment_rg_number').notNullable()
    })
  }

  down () {
    this.table('conductors', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConductorSchema
