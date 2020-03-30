'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsTypeSchema extends Schema {
  up () {
    this.create('appeals_types', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('title', 80).notNullable()
      table.string('description', 250).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('appeals_types')
  }
}

module.exports = AppealsTypeSchema
