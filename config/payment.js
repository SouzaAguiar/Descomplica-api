'use strict'

const Env = use('Env')

module.exports = {

 sandbox:(Env.get('NODE_ENV') ==='development'),
 access_token:Env.get('MERCADO_PAGO_ACCESS_TOKEN_DEV') 

}