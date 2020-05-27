'use strict'

const Conductor = use("App/Models/Conductor");
const UploadSevice = use('Adonis/Services/UploadImage')


class ConductorController {

    async store({ auth, request }){
      
      const { conductor } = request.only(['conductor'])
      const  user = await auth.user
      const  conductorObject = JSON.parse(conductor)
    
      const  conductorDocImage = request.file('conductorDocImage',{type:['image'],size:'4mb'})
   
      const  conductorDocImagePath = await UploadSevice.upload(conductorDocImage)
  
        conductorObject.docmentImgUri = conductorDocImagePath
        return await user.conductors().create(conductorObject)
        

    }
    

    async destroy ({ params }) {
     
      const conductor = await Conductor.find(params.id)
      await conductor.delete()

    }

    async update ({ request }) {

      const { conductor } = request.only(['conductor'])
      const  conductorObj = JSON.parse(conductor)
        
      const  conductorDocImage = request.file('conductorDocImage',{type:['image'],size:'4mb'})
     
      if(conductorDocImage){
        const  conductorDocImagePath = await UploadSevice.upload(conductorDocImage)
        conductorObj.docmentImgUri = conductorDocImagePath
      }
      
      const savedConductor =await Conductor.find(conductorObj.id)
      savedConductor.merge(conductorObj)
      return await savedConductor.save()
   
   
    }

}

module.exports = ConductorController


