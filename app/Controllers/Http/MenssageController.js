'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
   * Render a form to be used for creating a new menssage.
   * GET menssages/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
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
    const { menssage }= request.only(['menssage'])
     const user = await auth.user
   await user.messages().create({ menssage })
  }



  /**
   * Render a form to update an existing menssage.
   * GET menssages/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
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
}

module.exports = MenssageController
