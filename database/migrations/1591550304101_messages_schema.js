'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.table('messages', (table) => {
      table.string('menssage',1024).notNullable()
    })
  }

  down () {
    this.table('messages', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MessagesSchema
