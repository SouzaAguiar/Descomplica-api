'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const AppealReason = use("App/Models/AppealReason");

class AppealsReasonController {

    async store({ request }){
        const { options,description } = request.all()
 
        const appealReason = await AppealReason.create(data)
        await appealReason.options().attach(options)
    
    }

    async index(){
        return await AppealReason.all()
    }

    async update ({ params , request }) {
        const {options,...appealReasonData} = request.all()
        
        const appealReason = await AppealReason.findBy('id',params.id)
      
        appealReason.merge(appealReasonData)
        await appealReason.options().attach(options)
        await appealReason.save()
      
        }
}



module.exports = AppealsReasonController
