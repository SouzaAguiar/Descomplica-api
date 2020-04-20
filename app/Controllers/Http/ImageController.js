'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const {Storage}  = require('@google-cloud/storage');
const path = require('path');
const Helpers = use('Helpers')
const CLOUD_BUCKET ="descomplicar_images"
const CLOUD_ID ="descomplica-268300";
const DEFULT_PATH =  `https://storage.googleapis.com/${CLOUD_BUCKET}/`;


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");
/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    return await auth.user.images().fetch()
  }

  /**
   * Render a form to be used for creating a new image.
   * GET images/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {

    
  const user = auth.user

  const storage = new Storage({
    projectId: CLOUD_ID,
    keyFileName:path.join(__dirname,'../descomplica-268300-b7a152443492.json')
});
    const bucket =  storage.bucket(CLOUD_BUCKET);

    const images = request.file('image',{type:['image'],size:'4mb'})

    

  await images.moveAll(Helpers.tmpPath('uploads'), file => ({
    name: `${Date.now()}-${file.clientName}`
  }))
  
  if (!images.movedAll()) {
    return images.errors()
  }

  await Promise.all(
    images
      .movedList()
      .map(image => bucket.upload(Helpers.tmpPath('uploads')+'/'+image.fileName) )
  )
  
  await Promise.all(
    images
      .movedList()
      .map(image => user.images().create({ path: image.fileName }))
  )

  }

  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({auth}) {
   
  }

  /**
   * Render a form to update an existing image.
   * GET images/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ImageController
