'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsSchema extends Schema {
  up () {
    this.create('appeals', (table) => {
      table.increments()
      table.integer('type_id').unsigned().references('id').inTable('appeals_types')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles')
      table.integer('conductor_id').unsigned().references('id').inTable('conductors')
      table.string('status').defaultTo('Pendente')
      table.string('defence_type_id').notNullable()
      table.string('reasons')
      table.string('assessmentNumber').notNullable()
      table.string('notificationNumber').notNullable()
      table.string('taxing_entity').notNullable()
      table.string('contestation_type').notNullable()
      table.string('inconsistencies')
      table.string('ticketPhotoUri').notNullable()


      table.timestamps()
    })
  }

  down () {
    this.drop('appeals')
  }
}

module.exports = AppealsSchema
