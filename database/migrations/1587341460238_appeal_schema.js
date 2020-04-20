'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealSchema extends Schema {
  up () {
    this.table('appeals', (table) => {
      table.string('inconsistencies',2048).alter()
      table.string('contestations',2048).notNullable().alter()
      table.string('historic',2048).alter()
    })
  }

  down () {
    this.table('appeals', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AppealSchema
