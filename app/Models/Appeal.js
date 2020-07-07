'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Env = use('Env')

class Appeal extends Model {

    static boot () {
        super.boot()
        this.addHook('afterFetch','AppealHook.loadRelations' )
        this.addHook('beforeSave','AppealHook.vehicleAndConductorStringfy' )
        this.addHook('afterFetch','AppealHook.parseVehicleAndConductor' )
         
        }

    user(){
        return this.belongsTo('App/Models/User')
            }
   appealsType(){
       return this.belongsTo('App/Models/AppealsType','typeId')
   }        
  


}

module.exports = Appeal
