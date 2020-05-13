'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsTypeContestationSchema extends Schema {
  up () {
    this.create('appeals_type_contestation', (table) => {
      table.increments()
      table.integer('contestation_id')
      table.integer('appeal_type_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('appeals_type_contestation')
  }
}

module.exports = AppealsTypeContestationSchema
