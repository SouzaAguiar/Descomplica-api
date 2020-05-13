'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contestation extends Model {


    static boot () {
        super.boot()
    
      
        this.addHook('beforeSave','ContestationHook.fieldsToString' )
        this.addHook('afterFind','ContestationHook.fieldsToArray' )
        this.addHook('afterFetch','ContestationHook.fieldsToArray' )
        this.addHook('afterFetch','ContestationHook.getOptions' )

        
      }
        options(){
         return this.belongsToMany('App/Models/Option','contestation_id','option_id')
      }

}

module.exports = Contestation
