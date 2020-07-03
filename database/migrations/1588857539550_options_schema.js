'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionsSchema extends Schema {
  up () {
    this.create('options', (table) => {
      table.increments()
      table.string('descripton').notNullable()
      table.boolean('requiredAttachment').defaultTo(false)
      table.string('attachment',1024).defaultTo('[]')
      table.string('inputName')
      table.enum('AttachmentInputType',['yes/no','textInput','imageInput','dataPiker'])
      table.boolean('required').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('options')
  }
}

module.exports = OptionsSchema
