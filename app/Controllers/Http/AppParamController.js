'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  AppParams = use('App/Models/AppParams');
class AppParamController {


    async upDatePrice({ request }){
 const { price }  = request.only(['price'])
 
     const app = await AppParams.findBy('id',1)
     
     app.merge({price:parseFloat(price)})
     await app.save()
  
    }

    async upDateDeadLine({ request }){
        const { deadline }  = request.only(['deadline'])
        
            const app = await AppParams.findBy('id',1)
            
            app.merge({deadline})
            await app.save()
         
           }

    async appInitParams({ request }){
        const data = request.all();
      await  AppParams.create(data)
    }

    async show(){
        return await AppParams.findBy('id',1)
    }

    async update({ request }){

        const data = request.all();
        const param = await AppParams.find(data.id)
        param.merge(data)
       return await  param.save()

    }


}

module.exports = AppParamController
