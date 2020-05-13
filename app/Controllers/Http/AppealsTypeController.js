'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  ApealsTypes = use('App/Models/AppealsType');

class AppealsTypeController {

    async store({request}){

        //const {title, description,type} = request.only(['description','title','type'])
        const {materialIssues,formalIssues,...apealsTypesData } = request.all()

        // const appealsType =  await ApealsTypes.create({title, description,type})
        const appealsType =  await ApealsTypes.create(apealsTypesData)
        await appealsType.contestations().attach(materialIssues)
        await appealsType.appealsType().attach(formalIssues)
   

    }

    async show(){
        return await ApealsTypes.all()
    }

    async update({params ,request }){ 

        const {materialIssues,formalIssues,...apealsTypesData } = request.all()

        const appealsType = await ApealsTypes.find(params.id)

        appealsType.merge(apealsTypesData)

        await appealsType.contestations().attach(materialIssues)
        await appealsType.appealsType().attach(formalIssues)
        await appealsType.save()

    


    }
}

module.exports = AppealsTypeController
