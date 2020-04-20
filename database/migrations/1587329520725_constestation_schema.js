'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConstestationSchema extends Schema {
  up () {
    this.table('contestations', (table) => {
      table.string('items',1024).notNullable().alter()
    })
  }

  down () {
    this.table('contestations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ConstestationSchema
