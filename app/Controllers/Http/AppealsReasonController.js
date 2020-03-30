'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const AppealReason = use("App/Models/AppealReason");

class AppealsReasonController {

    async store({request }){
        const {description} = request.only(['description'])

     await AppealReason.create({description})


    }

    async index(){
        return await AppealReason.all()
    }
}

module.exports = AppealsReasonController
