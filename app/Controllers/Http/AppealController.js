'use strict'




/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Appeal = use('App/Models/Appeal');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Vehicles = use('App/Models/Vehicle');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Conductor = use('App/Models/Conductor');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  AppealsType = use('App/Models/AppealsType');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  User = use('App/Models/User')

const db = use('Database')




/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
class AppealController {


     /**
   * @param {object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @param {View} ctx.view
   */
    async store({request,response}){

        const data = request.only([
        'type_id',
        'defence_type_id',
        'user_id',
        'assessmentNumber',
        'notificationNumber',
        'taxing_entity',
        'ticketPhotoUri',
        'vehicle_id',
        'conductor_id',
        'contestation_type',
        'reasons',
        'inconsistencies'
        ])
        data.inconsistencies =data.inconsistencies.toString()
        data.reasons = data.reasons.toString();
    await Appeal.create(data);

 response.status(201).send('ok');
    
}

async index({auth}){
  const  user = auth.user
  const appeals= await user.appeals().fetch()

 const data = await Promise.all( appeals.rows.map(async(i)=>{
  const item = i.$originalAttributes
  
  item['vehicle'] = await Vehicles.findBy('id',item.vehicle_id)
  item['conductor']= await Conductor.findBy('id',item.conductor_id)
  const type = await AppealsType.findBy('id',item.type_id)
  item['type']=type.type

  item.reasons = item.reasons.split(',')
  item.inconsistencies = item.inconsistencies.split(',')
  return item
})
 )

 
 return data


  

 

  
}


}
module.exports = AppealController
