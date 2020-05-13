'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsTypeSchema extends Schema {
  up () {
    this.table('appeals_types', (table) => {
      table.string('legalDescription',512).notNullable()
      table.string('article',512)
      table.string('template',512).notNullable()
    })
  }

  down () {
    this.table('appeals_types', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AppealsTypeSchema
