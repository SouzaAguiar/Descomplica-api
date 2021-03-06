'use strict'


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Appeal = use('App/Models/Appeal');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  ApealsTypes = use('App/Models/AppealsType');

const UploadSevice = use('Adonis/Services/UploadImage')

const PdfCreator = use('Adonis/Services/PdfCreator')
const Helpers = use('Helpers')


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
    async store({ request, auth, response }){
      console.log('aqui')
  
     const { appeal, attchNames } = request.only(['appeal','attchNames'])
  
    
      const appealObj = JSON.parse(appeal)
     const  attchNamesObj = JSON.parse(attchNames)
      const user = await auth.user
      const appealToPdf = appealObj
 
      appealToPdf.type = await ApealsTypes.find(appealToPdf.typeId)
 
      const {formal=[],material={} } = appealToPdf.contestations
      delete  appealToPdf.contestations

      if(Object.keys(material).length !== 0){

        appealToPdf.contestations = [...formal,material]
      }else{
        appealToPdf.contestations = [...formal]
      }
     
      appealToPdf.user = user
      let ticketPhotoUri=''
  
      try {
       const ticketImage = request.file('ticketImage',{type:['image'],size:'6mb'})
       ticketPhotoUri  = await UploadSevice.upload(ticketImage)
     
      } catch (error) {
        response.status(400).send('ticketImage upload Error')
      }

      if(attchNamesObj.length !== 0){

       
        const  attchments = await Promise.all( 
          attchNamesObj.map( async name =>{
       
          const attchFile = request.file(name,{type:['image'],size:'6mb'})
          return  await UploadSevice.upload(attchFile) 
        
        })
        )
         appealToPdf.attchments = attchments
      }
      

   
      appealObj.ticketPhotoUri = ticketPhotoUri
      appealToPdf.ticketPhotoUri =ticketPhotoUri
      
      
    const appealName = `${Date.now().toString()}-${appealToPdf.conductor.conductor_docment_number}.pdf`
    
     await PdfCreator.generatePdf(appealToPdf,appealName,UploadSevice)
    
     appealObj.fileName = appealName 

     appealObj.vehicleId = appealObj.vehicle.id
     appealObj.conductorId = appealObj.conductor.id
     appealObj.contestations = JSON.stringify(appealObj.contestations)

     delete appealObj.user
     delete appealObj.type
     if(appealObj.attchments){
      delete appealObj.attchments
     }
     
     
     appealObj.historic = JSON.stringify(appealObj.historic)
 
      await user.appeals().create(appealObj)
     
}


async getAll(){

 return  await Appeal.all()
    
}

  async index({ auth }){

  const  user = auth.user
  const appeals= await user.appeals().fetch()
  const data = await Promise.all( appeals.rows.map(async(i)=>{
  const item = i

  item.inconsistencies = JSON.parse(item.inconsistencies)
  item.historic = JSON.parse(item.historic)
  return item
})
 )

 return data
  
}
async update({params,request}){
  
  const data = request.all()
  

   delete data.tableData
   delete data.appealPdfFilePath
   delete data.user
   delete data.type
  
  const appeal = await Appeal.findOrFail(params.id)
 
  appeal.merge(data)
   await appeal.save()
   return true
  




  // const user = await auth.user
  // const appeals = await user.appeals().where('id',params.id).fetch()
  // const [ appeal ]= appeals.rows
  // appeal.signaturePath =''
  // appeal.contestations = JSON.stringify(appeals.contestations)
  // const data = request.all()
  // appeal.merge(data)
  // return await appeal.save()
 return true;
}

}
module.exports = AppealController
