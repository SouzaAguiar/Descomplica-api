'use strict'

const { Storage }  = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs').promises

const Helpers = use('Helpers')
const CLOUD_BUCKET ="descomplicar_images"
const CLOUD_ID ="descomplica-268300";
const DEFULT_PATH =  `https://storage.googleapis.com/${CLOUD_BUCKET}/`;


class UploadImageService{



     constructor(config){

       const storage = new Storage({
            projectId: CLOUD_ID,
            keyFileName:path.join(__dirname,'../descomplica-268300-b7a152443492.json')
        });
          this.bucket = storage.bucket(CLOUD_BUCKET);
    }


  async upload(image){

const fileName = Date.now().toString()
   
 await image.move(Helpers.tmpPath('uploads'),{name:fileName ,overwrite: true})

          if (!image.moved()) {
            return image.errors()
          }
      
        this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName) 

        
        return  DEFULT_PATH + fileName
    }



    async uploadBase64(file){

 let base64Image = file.split(';base64,').pop();
 
const fileName =  Date.now().toString()+'.jpg'


  await fs.writeFile(Helpers.tmpPath('uploads')+'/'+fileName, base64Image, {encoding: 'base64'})
    this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName)  
    return  DEFULT_PATH + fileName
    
} 
 

     
   
  
}

module.exports = UploadImageService