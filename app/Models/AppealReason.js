'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AppealReason extends Model {

    static boot () {
        super.boot()
    this.addHook('afterFetch','ContestationHook.getOptions' )
    }
    options(){
        return this.belongsToMany('App/Models/Option','appeal_reasons_id','option_id')
     }
}

module.exports = AppealReason
