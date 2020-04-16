'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const PaymentService = require('./PaymentService')

class PaymentProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
     
    this.app.bind('Adonis/Services/Payment', (app) => {
      // Obtain application configuration in config/
      const Config = app.use('Adonis/Src/Config')
      
      // Export our service
      return new PaymentService(Config)
    //
    })
  }


}

module.exports = PaymentProvider
