'use strict'




/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Appeal = use('App/Models/Appeal');


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  ApealsTypes = use('App/Models/AppealsType');


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Vehicles = use('App/Models/Vehicle');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Conductor = use('App/Models/Conductor');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  AppealsType = use('App/Models/AppealsType');
const VehicleModel = use("App/Models/Vehicle");


const UploadSevice = use('Adonis/Services/UploadImage')

const PdfCreator = use('Adonis/Services/PdfCreator')

const Helpers = use('Helpers')
const Mail = use("Mail");


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
    async store({ request, auth }){
      console.log('aqui')
  
     const { appeal } = request.only(['appeal'])
      const appealObj = JSON.parse(appeal)
      const user = await auth.user
     
    
      const appealToPdf = appealObj
      appealToPdf.type = await ApealsTypes.find(appealToPdf.typeId)
      console.log('aqui')
      const {formal=[],material={} } = appealToPdf.contestations
     
      delete  appealToPdf.contestations
  
      appealToPdf.contestations = [...formal,material]
      console.log('aqui')
      appealToPdf.user = user
      console.log('aqui')
    

  const ticketImage = request.file('ticketImage',{type:['image'],size:'4mb'})
  const ticketPhotoUri = await UploadSevice.upload(ticketImage)
  console.log('aqui')
 
      

      appealObj.ticketPhotoUri = ticketPhotoUri
      appealToPdf.ticketPhotoUri =ticketPhotoUri

   
    console.log('aqui')
    const appealName = `${Date.now().toString()}-${appealToPdf.conductor.conductor_docment_number}.pdf`
    try {
       await PdfCreator.generatePdf(appealToPdf,appealName)
     const docmentPath = await UploadSevice.uploadFileByPath(`./tmp/${appealName}`)
     console.log(docmentPath)

    } catch (error) {
      console.log(error)
    }
    
     appealObj.contestations = JSON.stringify(appealObj.contestations)
     delete appealObj.user
     delete appealObj.conductor
     delete appealObj.vehicle
     delete appealObj.type
    
     appealObj.historic = JSON.stringify(appealObj.historic)
    try {
      await user.appeals().create(appealObj)
    } catch (error) {
      console.log(error)
    }
   
   
     
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
