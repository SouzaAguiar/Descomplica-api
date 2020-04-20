'use strict'
const mercadopago = require('mercadopago')
const axios = require('axios')

var getPaymentMethodsApi;
var getInstallmentsBaseApi;

class PaymentService {

  constructor(config){
   const paymentConfig =config._config.payment

    mercadopago.configure(paymentConfig);

    getPaymentMethodsApi =`https://api.mercadopago.com/v1/payment_methods?access_token=${paymentConfig.access_token}&js_version=1.6.18`
    getInstallmentsBaseApi =`https://api.mercadopago.com/v1/payment_methods/installments?access_token=${paymentConfig.access_token}&js_version=1.6.18&`
  
  }
 
  async getCreditCards(user){

    const filters = {
      email:user.email
    }; 
    const  data = await mercadopago.customers.search({qs: filters})
    if(data.response.results.length >0){
      return data.response.results[0].cards
    }
    return []
  }
    
async createCreditCard(user,params){

  const filters = {
    email:user.email
  }; 

  let cardParams = {
    "token":params.token,
    "customer_id":''
  }


  const  data = await mercadopago.customers.search({qs: filters})

  if(data.response.results.length >0){

  const customer_id = data.response.results[0].id
  cardParams.customer_id = customer_id

    const cardData = await mercadopago.card.create(cardParams)
  
  

  return cardData.response

  }else{

const {name,email}=user
const {identification,token } = params

const TempName = name.split(' ');
const [first_name,...temp_last_name]= TempName
let last_name =temp_last_name.join()
last_name=last_name.replace(',','')

const customerData ={email,first_name,last_name,identification}

const data = await mercadopago.customers.create(customerData)
 const { id } = data.response
 cardParams.customer_id =id
 
  const  resp = await mercadopago.card.create(cardParams)
  return resp.response
  }
  
}

async createPayment(payment){

  

try {
  const resp = await  mercadopago.payment.create(payment)
 
  if(resp.response.status ==='approved'){
    return {isSuccess:true,data:resp.response}
  }
  return {isSuccess:false,data:{paymentStatus:resp.response.status}}
} catch (error) {
  console.log(error)
  return {isSuccess:false,data:error}

}
  
 
}

async createCredidCardAndPay(user,params,payment){


  const card = await this.createCreditCard(user,params)
 
  const pay = payment

  pay.payment_method_id=card.payment_method.id
 // pay.installments= 1
  pay.issuer_id=card.issuer.id.toString()
  pay.payer={email:user.email}

const paymentResponse = await this.createPayment(pay)
return {card,paymentResponse}

}

async deleteCard(user,id){

  const customer_id = await this.getCustomerId(user)
  if(customer_id){

  await  mercadopago.card.delete(customer_id,id)
  }
 
}

  async getCustomerId(user){
    const filters = {
      email:user.email
    }
    const  data = await mercadopago.customers.search({qs: filters})

    if(data.response.results.length >0){
      return data.response.results[0].id
    }else{
      return null
    }

  }

  async getInstallments(bin,amount){


 
  const { data } = await axios.get(getPaymentMethodsApi)
  let payment_methodsName ='';

  await data.map((item)=>{
    if(item.settings[0]){
      
    let regex = new RegExp(item.settings[0].bin.pattern)
   if( regex.test(bin)){
     payment_methodsName = item.id
  }
    }

   })

if(payment_methodsName !== ''){
  const url = getInstallmentsBaseApi +'payment_method_id='+ payment_methodsName +'&amount='+amount

  const { data } = await axios.get(url)
  return data[0].payer_costs
}

  }

  }

module.exports = PaymentService
