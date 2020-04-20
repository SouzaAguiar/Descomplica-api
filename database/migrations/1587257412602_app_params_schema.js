'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppParamsSchema extends Schema {
  up () {
    this.create('app_params', (table) => {
      table.increments()
      table.integer('deadline').notNullable()
      table.float('price').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('app_params')
  }
}

module.exports = AppParamsSchema
