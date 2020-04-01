'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const constestation = use("App/Models/Contestation");

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
    const contestations = await constestation.all()

    const data = Promise.all( contestations.rows.map(async(i)=>{
      const item = i.$originalAttributes
      
      item.items=JSON.parse(item.items)
      return item
    }


    )

    )

    
    return data

      
    
    

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
    const {descripton,items} = request.only(['descripton','items'])
   await constestation.create({descripton,items:JSON.stringify(items)})

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
  async update ({ params, request, response }) {
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
}

module.exports = ContestationController
