'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IssueResponseSchema extends Schema {
  up () {
    this.create('issue_responses', (table) => {
      table.increments()
      table.enum('response',['true','false'])
      table.timestamps()
    })
  }

  down () {
    this.drop('issue_responses')
  }
}

module.exports = IssueResponseSchema
