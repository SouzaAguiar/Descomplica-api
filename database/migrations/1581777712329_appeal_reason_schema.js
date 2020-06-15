'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealReasonSchema extends Schema {
  up () {
    this.create('appeal_reasons', (table) => {
      table.increments()
      table.text('description',80)
      table.string('template')
      table.boolean('requiredAttachment').defaultTo(false)
      table.enum('AttachmentInputType',['yes/no','textInput','imageInput','dataPiker'])
      table.string('attachment',1024).defaultTo('[]')
      table.string('legalDescripton').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('appeal_reasons')
  }
}

module.exports = AppealReasonSchema
