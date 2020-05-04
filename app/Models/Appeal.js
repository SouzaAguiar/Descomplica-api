'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Env = use('Env')

class Appeal extends Model {

    user(){
        return this.belongsTo('App/Models/User')
            }
   appealsType(){
       return this.hasOne('App/Models/AppealsType')
   }        
   vehicle(){
    return this.hasOne('App/Models/Vehicle')
}         
conductor(){
    return this.hasOne('App/Models/Conductor')
}   


}

module.exports = Appeal
