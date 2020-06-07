'use strict'
const Env = use('Env')
const axios = require('axios')
const AppealHook = exports = module.exports = {}

AppealHook.loadRelations = async (appeals) => {
    
    return  await Promise.all( appeals.map( async appeal =>{

        const temp = appeal
        temp.user = await appeal.user().fetch();
        temp.conductor = await appeal.conductor().fetch();
        temp.vehicle = await appeal.vehicle().fetch();
        temp.type = await appeal.appealsType().fetch();
        temp.contestations = JSON.parse(temp.contestations)
        temp.signaturePath= await getDocumentPath(temp.signature_document_key)
        temp.appealPdfFilePath = `${Env.get('APP_URL')}/file/${temp.fileName}`
        return temp
   
    }))

   
}
async function getDocumentPath(key){
 const resposnse = await axios.get(`${Env.get('CLICKSING_READ_DOCMENT_ENDPOINT')}${key}?access_token=${Env.get('CLICKSING_ACCESS_TOKEN')}`)
 const {document}= resposnse.data
 const {signed_file_url} = document.downloads


 return signed_file_url
}