'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const UploadImageService = require('./UploadImageService')

class UploadImageProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register () {
       
      this.app.bind('Adonis/Services/UploadImage', (app) => {
        // Obtain application configuration in config/
        const Config = app.use('Adonis/Src/Config')
        
        // Export our service
        return new UploadImageService(Config)
      //
      })
    }
  
  
  }
  
  module.exports = UploadImageProvider
  