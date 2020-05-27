'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestationSchema extends Schema {
  up () {
    this.create('contestations', (table) => {
      table.increments()
      table.string('descripton').notNullable()
      table.string('items',1024).notNullable()
      table.string('legalDescripton').notNullable()
      table.boolean('requiredAttachment').defaultTo(false)
      table.string('attachment',1024).defaultTo('[]')
      table.string('type').notNullable().defaultTo('FORMAL')
      table.string('template')
      table.timestamps()
    })
  }

  down () {
    this.drop('contestations')
  }
}

module.exports = ContestationSchema
