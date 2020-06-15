'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Option extends Model {

    static boot () {
       super.boot()
    
      
        this.addHook('beforeSave','OptionHook.fieldsToString')
        this.addHook('afterFind','OptionHook.fieldsToArray' )
        this.addHook('afterFetch','OptionHook.fieldsToArray')

        
      }

    
}

module.exports = Option
