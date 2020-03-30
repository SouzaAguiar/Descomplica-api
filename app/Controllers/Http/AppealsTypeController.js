'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  ApealsTypes = use('App/Models/AppealsType');

class AppealsTypeController {

    async store({request}){

        const {title, description,type} = request.only(['description','title','type'])

        await ApealsTypes.create({title, description,type})
   

    }

    async show(){
        return await ApealsTypes.all()
    }
}

module.exports = AppealsTypeController
