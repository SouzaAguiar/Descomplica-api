
'use strict'
const axios = require('axios')

const headers = {
    'Content-Type':'application/json',
    'Accept':'application/json'
 }

var UrlClickSing

class SingService {

  constructor(config){
  UrlClickSing = config
    
  }
 
  
  async sing(user,singData){

    const { 
        Infração_numero,
        Nome_completo,
        CPF, 
        Dia_da_Assinatura, 
        Mês_da_Assinatura,
        Ano_da_Assinatura,
       } = singData
 
 const document = {
    "path": `/PROCURAÇOES/${CPF}-${Nome_completo}-procuracao.docx`,
    "template": {
    "data": {
         "Infração numero":Infração_numero,
         "Nome completo":Nome_completo,
         "CPF":CPF,
         "Dia da Assinatura": Dia_da_Assinatura,
         "Mês da Assinatura": Mês_da_Assinatura,
         "Ano da Assinatura": Ano_da_Assinatura
    }}}   


 try {
     

    const docmentkey = await this.creteDocment(document)
    const signer_key =await this.createSigner(user)


     const list = {
   "document_key": docmentkey,
    "signer_key":signer_key ,
    "sign_as": "sign"
    }
    
    const singResponse = await axios.post(`${UrlClickSing.createSingEndPoint}access_token=${UrlClickSing.access_token}`,{ list },{headers})
   
    return {isSuccess:true,singUrl:singResponse.data.list.url,signer_key,document_key:docmentkey}

 } catch (error) {
  console.log(error)
 return {isSuccess:false}
 }
      
    
  }


  async createSigner(user){

    if(user.signer){
        return user.signer
    }

    const signer= {
        email: user.email,
        auths: [
        'email' 
        ],
        name: user.name,
        has_documentation: false,
        delivery:"none"
      }
    
        const signerResponse = await axios.post(`${UrlClickSing.signerEndPoint}access_token=${UrlClickSing.access_token}`,
      { signer },{headers})
        const Signerkey = signerResponse.data.signer.key
        return Signerkey   

  }

  async creteDocment(document){

    
    const docmentResponse = await axios.post(`${UrlClickSing.documentEndPoint}access_token=${UrlClickSing.access_token}`,
    {document:document},{headers})
    const  docmentkey = docmentResponse.data.document.key
    return docmentkey
  }

  
   
  }

  

module.exports = SingService
