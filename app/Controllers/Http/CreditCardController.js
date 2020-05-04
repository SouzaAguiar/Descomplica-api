'use strict'
const Payment = use('Adonis/Services/Payment')


class CreditCardController {


    async store({ request, auth }) {

      const user = await auth.user
      const data = request.all()
      const card = await Payment.createCreditCard(user,data)

      await  user.cardTokens().create({card_id:card.id,token:data.token})
      return card

    }
    
    async delete({ auth, request }){

      /** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
      const user = await auth.user
      const { card_id } = request.only(['card_id'])
      await Payment.deleteCard(user,card_id)

      console.log('deleted')


    }


async show({ auth }){
const user = await auth.user
const cards = await Payment.getCreditCards(user)
return cards
    }

    async index({ auth }){
   
 
    }
}

module.exports = CreditCardController
