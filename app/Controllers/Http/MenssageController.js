'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Mail = use("Mail");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const messages = use("App/Models/Messages");
/**
 * Resourceful controller for interacting with menssages
 */
class MenssageController {
  /**
   * Show a list of all menssages.
   * GET menssages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    

  }


  /**
   * Create/save a new menssage.
   * POST menssages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const { message,title }= request.only(['message','title'])
    const user = await auth.user
   await user.messages().create({menssage:message,title })
   console.log(message)
   await Mail.send(
    "emails.userMessage",
    { message,title,name:user.name,email:user.email },
    Tempmessage => {
      Tempmessage
        .to('recorrepramim@gmail.com')
        .from(user.email)
        .subject("Menssagem de usuario");
    }
  )


  }

async setHasRead({request, params }){
  const { hasRead } = request.only(['hasRead'])
  const message = await messages.find(params.id)
  

  message.merge({hasRead})
  return await message.save()
  

}

async getNotReadMessesages(){
  return await messages
  .query()
  .where('hasRead','!=',true)
  .fetch()
}



  /**
   * Delete a menssage with id.
   * DELETE menssages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params, auth }) {
    const user = await auth.user
    const menssages = await user.messages().where('id',parseInt(params.id)).fetch()
    const [menssage]= menssages.rows

    return await  menssage.delete()

  }

  async getAllMessage(){
  return await messages.all()

  }
}

module.exports = MenssageController
