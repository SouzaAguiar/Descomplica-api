'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestationSchema extends Schema {
  up () {
    this.create('contestations', (table) => {
      table.increments()
      table.string('descripton').notNullable()
      table.string('items').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contestations')
  }
}

module.exports = ContestationSchema
