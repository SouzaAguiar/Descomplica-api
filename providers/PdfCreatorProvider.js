'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const PdfCreatorService = require('./PdfCreatorService')


class PdfCreatorProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
     
    this.app.bind('Adonis/Services/PdfCreator', (app) => {

      const Config = app.use('Adonis/Src/Config')
      return new PdfCreatorService(Config)
   
    })
  }
  

}

module.exports = PdfCreatorProvider
