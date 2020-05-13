'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsTypeAppealReasonSchema extends Schema {
  up () {
    this.create('appeals_type_appeal_reasons', (table) => {
      table.increments()
       table.integer('appeal_reason_id')
       table.integer('appeal_type_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('appeals_type_appeal_reasons')
  }
}

module.exports = AppealsTypeAppealReasonSchema
