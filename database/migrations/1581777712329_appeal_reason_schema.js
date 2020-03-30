'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealReasonSchema extends Schema {
  up () {
    this.create('appeal_reasons', (table) => {
      table.increments()
      table.text('description',80)
      table.timestamps()
    })
  }

  down () {
    this.drop('appeal_reasons')
  }
}

module.exports = AppealReasonSchema
