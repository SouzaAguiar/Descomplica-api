'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefenceTypeSchema extends Schema {
  up () {
    this.create('defence_types', (table) => {
      table.increments()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('defence_types')
  }
}

module.exports = DefenceTypeSchema
