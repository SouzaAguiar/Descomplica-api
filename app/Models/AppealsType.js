'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AppealsType extends Model {

  static boot () {
        super.boot()
        this.addHook('afterFetch','AppealTypeHook.loadRelations' )
         
        }


    contestations(){
        return this.belongsToMany('App/Models/Contestation','appeal_type_id','contestation_id')
      }
    appealsType(){
        return this
        .belongsToMany('App/Models/AppealReason','appeal_type_id','appeal_reason_id')
        .pivotTable('appeals_type_appeal_reasons')
    }  
}

module.exports = AppealsType
