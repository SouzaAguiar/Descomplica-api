'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('message',1024).notNullable()
      table.boolean('hasRead').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
