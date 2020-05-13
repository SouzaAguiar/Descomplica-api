'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestationOptionSchema extends Schema {
  up () {
    this.create('contestation_option', (table) => {
      table.increments()
      table.integer('contestation_id')
      table.integer('option_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('contestation_option')
  }
}

module.exports = ContestationOptionSchema
