'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealReasonOptionsSchema extends Schema {
  up () {
    this.create('appeal_reason_options', (table) => {
      table.increments()
      table.integer('appeal_reasons_id')
      table.integer('option_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('appeal_reason_options')
  }
}

module.exports = AppealReasonOptionsSchema
