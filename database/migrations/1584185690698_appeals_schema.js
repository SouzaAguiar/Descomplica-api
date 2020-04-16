'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsSchema extends Schema {
  up () {
    this.create('appeals', (table) => {
      table.increments()
      table.integer('typeId').unsigned().references('id').inTable('appeals_types')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('vehicleId').unsigned().references('id').inTable('vehicles')
      table.integer('conductorId').unsigned().references('id').inTable('conductors')
      table.string('status').defaultTo('Pendente')
      table.string('defence_type').notNullable()
      table.string('notificationNumber').notNullable()
      table.string('taxingOrgan').notNullable()
      table.string('inconsistencies')
      table.string('ticketPhotoUri').notNullable()
      table.string('signaturePath').notNullable()
      table.string('contestations').notNullable()
      table.string('paymentId').notNullable()
      table.string('paymentStatus').notNullable()
      table.string('descripton').notNullable()
      table.string('historic')
      table.timestamps()
    })
  }

  down () {
    this.drop('appeals')
  }
}

module.exports = AppealsSchema
