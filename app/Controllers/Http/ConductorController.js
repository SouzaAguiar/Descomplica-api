'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");


class ConductorController {

    async store({request}){

        const {user_id, is_individual,conductor_name,conductor_docment_number} = request.only(['user_id','is_individual','conductor_name','conductor_docment_number'])
          const user = await User.findByOrFail('id',user_id)
       await user.conductors().create({is_individual,conductor_name,conductor_docment_number})
       

    }
}

module.exports = ConductorController


