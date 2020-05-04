'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const SingService = require('./SingService')

class SingProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
     
    this.app.bind('Adonis/Services/Sing', (app) => {
      // Obtain application configuration in config/
      const Config = app.use('Adonis/Src/Config')
      
      // Export our service
      return new SingService(Config. _config.sing)
    //
    })
  }


}

module.exports = SingProvider
