'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppealsSchema extends Schema {
  up () {
    this.create('appeals', (table) => {
      table.increments()
      table.integer('typeId').unsigned().references('id').inTable('appeals_types')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('vehicleId').notNullable()
      table.integer('conductorId').notNullable()
      table.string('status').defaultTo('Pendente')
      table.string('defence_type').notNullable()
      table.string('notificationNumber').notNullable()
      table.string('taxingOrgan').notNullable()
      table.string('inconsistencies',2048)
      table.string('ticketPhotoUri').notNullable()
      table.string('signaturePath')
      table.string('contestations',8192).notNullable()
      table.string('paymentId').notNullable()
      table.string('paymentStatus').notNullable()
      table.string('description').notNullable()
       table.string('fileName')
      table.string('historic',2048)
      table.boolean('hasRead').defaultTo(false)
      table.string('signature_document_key')
      table.string('vehicle',1024)
      table.string('conductor',1024)
      table.timestamps()
    })
  }

  down () {
    this.drop('appeals')
  }
}

module.exports = AppealsSchema
