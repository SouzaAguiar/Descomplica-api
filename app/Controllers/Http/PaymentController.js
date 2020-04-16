'use strict'



const Payment = use('Adonis/Services/Payment')




class PaymentController {

    async store({ request }){

        const {payment} =request.only(['payment'])

  const resp = await Payment.createPayment(payment)
  //console.log(resp)
  return resp
        
        }


        
        async createAndPay({ auth ,request }){
        
            const { params ,payment } = request.all()
        

            const user = await auth.user
            const token = params.token

        const response =await    Payment.createCredidCardAndPay(user,params,payment)
        const {  id } = response.card

           // await  user.cardTokens().create({card_id:id,token})
            return response.paymentResponse
            
        
       
        }


    
}

module.exports = PaymentController
