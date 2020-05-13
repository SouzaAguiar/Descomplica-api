'use strict'




class ConductorController {

    async store({ auth, request }){
       
      const { conductor } = request.only(['conductor'])
      const  user = await auth.user
      const  conductorObject = JSON.parse(conductor)
      const  conductorDocImage = request.file('conductorDocImage',{type:['image'],size:'4mb'})
      const  conductorDocImagePath = await UploadSevice.upload(conductorDocImage)
      
      conductor.docmentImgUri = conductorDocImagePath
   
      return  await user.conductors().create(conductorObject)
  

    }
}

module.exports = ConductorController


