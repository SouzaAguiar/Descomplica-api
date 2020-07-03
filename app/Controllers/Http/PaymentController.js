'use strict'



const Payment = use('Adonis/Services/Payment')




class PaymentController {

    async store({ request }){

  const {payment} =request.only(['payment'])
  const resp = await Payment.createPayment(payment)
  
  return resp
        
        }


        
        async createAndPay({ auth ,request }){
        
            const { params ,payment } = request.all()
            payment.installments = parseInt(payment.installments)

            const user = await auth.user
            const token = params.token

        const response = await   Payment.createCredidCardAndPay(user,params,payment)
      //  const {  id } = response.card
        return response.paymentResponse
            
        
       
        }


    async getInstallments({ request }){
         const { bin, amount } =request.all();
         
     const payer_costs = await Payment.getInstallments(bin,amount)
     return payer_costs
        }


    
}

module.exports = PaymentController
