'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Env = use('Env')

class Appeal extends Model {

    static boot () {
        super.boot()
        this.addHook('afterFetch','AppealHook.loadRelations' )
         
        }

    user(){
        return this.belongsTo('App/Models/User')
            }
   appealsType(){
       return this.belongsTo('App/Models/AppealsType','typeId')
   }        
    vehicle(){
    return this.belongsTo('App/Models/Vehicle','vehicleId')
}         
   conductor(){
    return this.belongsTo('App/Models/Conductor','conductorId')
}   


}

module.exports = Appeal
