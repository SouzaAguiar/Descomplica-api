'use strict'

const { Storage }  = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs').promises

const Helpers = use('Helpers')
const CLOUD_BUCKET ="rpmimagens"
const CLOUD_DOC_BUCKET ="rpmdocumentos"
const CLOUD_ID ="descomplicar";
const DEFULT_PATH =  `https://storage.googleapis.com/${CLOUD_BUCKET}/`;
const DOCMENT_PATH =  `https://storage.googleapis.com/${CLOUD_DOC_BUCKET}/`;


class UploadImageService{



     constructor(config){

    const storage = new Storage({
            projectId: CLOUD_ID,
            keyFileName:path.join(__dirname,'../descomplicar-19043b08b378')
        });
          this.bucket = storage.bucket(CLOUD_BUCKET);
          this.docBucket = storage.bucket(CLOUD_DOC_BUCKET);

    }


  async upload(image){

const fileName = Date.now().toString()
   
 await image.move(Helpers.tmpPath('uploads'),{name:fileName ,overwrite: true})

          if (!image.moved()) {
            return image.errors()
          }

      try {
        console.log('start')
    await this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName) 
    console.log('done')
      } catch (error) {
        console.log('error')
        const { code } = error
       console.log(code)
        if(code === 403){
          
          try {
            console.log('trynig')
            await this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName) 
            console.log('sucess')
          } catch (error) {
            console.log('failure')
            return ''
          }
        }
        
      }
        

     
        
        
        return  DEFULT_PATH + fileName
    }



  async uploadBase64(file){

 let base64Image = file.split(';base64,').pop();
 
const fileName =  Date.now().toString()+'.jpg'


  await fs.writeFile(Helpers.tmpPath('uploads')+'/'+fileName, base64Image, {encoding: 'base64'})
    this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName)  
    return  DEFULT_PATH + fileName
    
} 

async uploadFileByPath(filePath){

const fileName = path.basename(filePath);
 try {
  console.log('start')
  await this.docBucket.upload(filePath)
  console.log('done')
 } catch (error) {
  console.log('error')
  const { code } = error
 
   if(code === 403){
     try {
      console.log('trynig')
      await this.docBucket.upload(filePath)
      console.log('sucess')
     } catch (error) {
      console.log('failure')
       return ''
       
     }
   }
   
 }
 
 return DOCMENT_PATH + fileName

}
 
   
  
}

module.exports = UploadImageService