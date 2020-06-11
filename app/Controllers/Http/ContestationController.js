'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Constestation = use("App/Models/Contestation");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Option = use("App/Models/Option");


/**
 * Resourceful controller for interacting with contestations
 */
class ContestationController {
  /**
   * Show a list of all contestations.
   * GET contestations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {

    const contestations = await Constestation.all()
   
    return contestations
  }


  /**
   * Create/save a new contestation.
   * POST contestations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  const { options,...data } = request.all()
 
  const contestation = await Constestation.create(data)
  await contestation.options().attach(options)
 

  }

  /**
   * Display a single contestation.
   * GET contestations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }



  /**
   * Update contestation details.
   * PUT or PATCH contestations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params , request }) {
  const {options,...constestationData} = request.all()
  
  const constestation = await Constestation.findBy('id',params.id)

  constestation.merge(constestationData)
  await constestation.options().attach(options)
  await constestation.save()

  }

  /**
   * Delete a contestation with id.
   * DELETE contestations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  async createOptions({ request }){
    const option = request.all();
   console.log(option)
    return await Option.create(option)

  
  }
}




module.exports = ContestationController
