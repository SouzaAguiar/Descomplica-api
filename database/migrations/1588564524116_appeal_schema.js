'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealSchema extends Schema {
  up () {
    this.table('appeals', (table) => {
      table.string('signature_document_key')
    })
  }

  down () {
    this.table('appeals', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AppealSchema
