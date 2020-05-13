'use strict'




/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Appeal = use('App/Models/Appeal');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  User = use('App/Models/User');


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Vehicles = use('App/Models/Vehicle');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Conductor = use('App/Models/Conductor');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  AppealsType = use('App/Models/AppealsType');

const UploadSevice = use('Adonis/Services/UploadImage')




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
    async store({request, auth }){
    
      const { appeal } = request.only(['appeal'])
      const appealObj = JSON.parse(appeal)
      const user = await auth.user
     
    //  const  signaturePath = await UploadSevice.uploadBase64(signature)
    // appealObj.signaturePath = signaturePath


      const ticketImage = request.file('ticketImage',{type:['image'],size:'4mb'})
    
      const ticketPhotoUri = await UploadSevice.upload(ticketImage)
      appealObj.ticketPhotoUri = ticketPhotoUri
      

     // if(!appealObj.conductorId){
        
    //  const { conductor } = appealObj  
    //  const  conductorDocImage = request.file('conductorDocImage',{type:['image'],size:'4mb'})
    //  const  conductorDocImagePath = await UploadSevice.upload(conductorDocImage)
      
    //  conductor.docmentImgUri = conductorDocImagePath
   
    //  const conductorCreated =  await user.conductors().create(conductor)
  
     // delete appealObj.conductor
     // appealObj.conductorId = conductorCreated.id
    //  }

  
     //   if(!appealObj.vehicleId){
      
     //   const { vehicle } = appealObj  
      //  const  vehicleDocImage = request.file('vehicleDocImage',{type:['image'],size:'4mb'})
      //  const  vehicleDocImagePath = await UploadSevice.upload(vehicleDocImage)

       // vehicle.url_img_docment = vehicleDocImagePath
  
       
      //  const vehicleCreated =  await user.vehicles().create(vehicle)
        
      //  delete appealObj.vehicle
     //   appealObj.vehicleId = vehicleCreated.id
     //   }
         appealObj.contestations = JSON.stringify(appealObj.contestations)
      //   appealObj.inconsistencies = JSON.stringify(appealObj.inconsistencies)
         appealObj.historic = JSON.stringify(appealObj.historic)
        

       await  user.appeals().create(appealObj)
        
}

async getAll(){

 return  await Appeal.all()
    
}

  async index({auth}){
  const  user = auth.user
  const appeals= await user.appeals().fetch()

  const data = await Promise.all( appeals.rows.map(async(i)=>{
  const item = i
  
  // item['vehicle'] = await Vehicles.findBy('id',item.vehicleId)
  // item['conductor']= await Conductor.findBy('id',item.conductorId)
  // const type = await AppealsType.findBy('id',item.typeId)
  // item['type']=type

  item.inconsistencies = JSON.parse(item.inconsistencies)
 // item.contestations = JSON.parse(item.contestations)
  item.historic = JSON.parse(item.historic)
  return item
})
 )

 return data
  
}


}
module.exports = AppealController
