'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContestationContestationSchema extends Schema {
  up () {
    this.create('contestation_contestation', (table) => {
      table.increments()
      table.integer('contestation_id')
      table.integer('contestation_related_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('contestation_contestation')
  }
}

module.exports = ContestationContestationSchema
