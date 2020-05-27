'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
const VehicleModel = use("App/Models/Vehicle");


const UploadSevice = use('Adonis/Services/UploadImage')


/**
 * Resourceful controller for interacting with vehicles
 */
class VehicleController {
  /**
   * Show a list of all vehicles.
   * GET vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new vehicle.
   * GET vehicles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new vehicle.
   * POST vehicles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth , request }) {
  console.log('vehicle')
    const { vehicle } = request.only(['vehicle'])
    const vehicleObject = JSON.parse(vehicle)
    const user = await auth.user

    const  vehicleDocImage = request.file('vehicleDocImage',{type:['image'],size:'4mb'})
    const  vehicleDocImagePath = await UploadSevice.upload(vehicleDocImage)

    vehicleObject.url_img_docment = vehicleDocImagePath;
    return await user.vehicles().create(vehicleObject)
  }

  /**
   * Display a single vehicle.
   * GET vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing vehicle.
   * GET vehicles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update vehicle details.
   * PUT or PATCH vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ request }) {
    const { vehicle } = request.only(['vehicle'])
    const vehicleObject = JSON.parse(vehicle)
  

    const  vehicleDocImage = request.file('vehicleDocImage',{type:['image'],size:'4mb'})
    if(vehicleDocImage){
      const  vehicleDocImagePath = await UploadSevice.upload(vehicleDocImage)
      vehicleObject.url_img_docment = vehicleDocImagePath;
    }
    const v = VehicleModel.find(vehicleObject.id)
     v.merge(vehicleObject)
    return await v.save()
  }

  /**
   * Delete a vehicle with id.
   * DELETE vehicles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    
    const vehicle = await Vehicle.find(params.id)
    await vehicle.delete()
  }
}

module.exports = VehicleController
