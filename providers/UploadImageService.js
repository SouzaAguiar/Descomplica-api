'use strict'

// const { Storage }  = require('@google-cloud/storage');
const StorageIbm = require('ibm-cos-sdk');
const path = require('path');
const fs = require('fs').promises
const Helpers = use('Helpers')

const CLOUD_BUCKET ="rpmimagens"
const CLOUD_DOC_BUCKET ="rpmdocumentos"
const CLOUD_ID ="descomplicar";
const DEFULT_PATH =  `https://storage.googleapis.com/${CLOUD_BUCKET}/`;
const DOCMENT_PATH =  `https://storage.googleapis.com/${CLOUD_DOC_BUCKET}/`;

// const IBMconfig = 
//   {
//    endpoint: 's3.us-south.cloud-object-storage.appdomain.cloud',
//    apiKeyId: 'iNvDlK1-drtQMCmZutWnwG8AtUR_O9_110B8ALriZrH9',
//    ibmAuthEndpoint: 'https://iam.cloud.ibm.com/identity/token',
//    serviceInstanceId: 'crn:v1:bluemix:public:cloud-object-storage:global:a/fdfc5c2113264ed997f097c378b01c45:04ed72f3-6634-48e4-a8c8-02d233234f26::',
//    cos_hmac_keys: {
//      access_key_id: "d449068093f44b8288b0b7ac692a348f",
//      secret_access_key: "fb93bfeee363f356b2a5c3330e823c209b84e35dba3e88e7"
//   }
//   };




var cosClient

class UploadImageService{


     constructor({_config:config}){
       const { filePath } = config.upload
       const { IBMconfig } = config.upload
       this.filePath = filePath
 
       cosClient = new StorageIbm.S3(IBMconfig);

   // const storage = new Storage({
        //    projectId: CLOUD_ID,
       //     keyFileName:path.join(__dirname,'../descomplicar-19043b08b378')
      //  });
        //  this.bucket = storage.bucket(CLOUD_BUCKET);
       //   this.docBucket = storage.bucket(CLOUD_DOC_BUCKET);

       

    }


  async upload(image){

const fileName =`${Date.now().toString()}.${image.extname}`
// console.log(image)
   
 await image.move(Helpers.tmpPath('uploads'),{name:fileName ,overwrite: true})

          if (!image.moved()) {
            return image.errors()
          }
          // return `${this.filePath}/${fileName}`
          
  const file =  await fs.readFile(Helpers.tmpPath(`uploads/${fileName}`));

    await  cosClient.putObject({
            Bucket: 'rpmstorage-imagens', 
            Key: fileName, 
            Body: file
        }).promise()
  
        return `https://s3.us-south.cloud-object-storage.appdomain.cloud/rpmstorage-imagens/${fileName}`
     // try {
     //   console.log('start')
   /// await this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName) 
   // console.log('done')
   //   } catch (error) {
    //    console.log('error')
    //    const { code } = error
    //   console.log(code)
    //    if(code === 403){
          
       //   try {
      //      console.log('trynig')
      //      await this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName) 
      //      console.log('sucess')
      //    } catch (error) {
      //      console.log('failure')
       //     return ''
      //    }
     //   }
        
      }
        

     
        
        
     //   return  DEFULT_PATH + fileName
    //}

   
  

  async uploadBase64(file){

 let base64Image = file.split(';base64,').pop();
 
const fileName =  Date.now().toString()+'.jpg'


  await fs.writeFile(Helpers.tmpPath('uploads')+'/'+fileName, base64Image, {encoding: 'base64'})
    this.bucket.upload(Helpers.tmpPath('uploads')+'/'+fileName)  
    return  DEFULT_PATH + fileName
    
} 

async uploadFileByPath(filePath){

const fileName = path.basename(filePath);
console.log(filePath)
const file =  await fs.readFile(filePath);

await  cosClient.putObject({
  Bucket: 'rpmstorage-imagens', 
  Key: fileName, 
  Body: file
}).promise()

return `https://s3.us-south.cloud-object-storage.appdomain.cloud/rpmstorage-imagens/${fileName}`
//  try {
//   console.log('start')
//   await this.docBucket.upload(filePath)
//   console.log('done')
//  } catch (error) {
//   console.log('error')
//   const { code } = error
 
//    if(code === 403){
//      try {
//       console.log('trynig')
//       await this.docBucket.upload(filePath)
//       console.log('sucess')
//      } catch (error) {
//       console.log('failure')
//        return ''
       
//      }
//    }
   
//  }
 
//  return DOCMENT_PATH + fileName

}
 
   
  
}

module.exports = UploadImageService