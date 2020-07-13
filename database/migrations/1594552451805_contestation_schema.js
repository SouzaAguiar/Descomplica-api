'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestationSchema extends Schema {
  up () {
    this.table('contestations', (table) => {
      table.integer('requeredCount').defaultTo(0)
  
    })
  }

  down () {
    this.table('contestations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ContestationSchema
