'use strict'

const Env = use('Env')

module.exports = {

 access_token:Env.get('CLICKSING_ACCESS_TOKEN'),
 documentEndPoint:Env.get('CLICKSING_CREATE_DOCMENT_ENDPOINT'),
 signerEndPoint:Env.get('CLICKSING_CREATE_SIGNER_ENDPOINT'),
 createSingEndPoint:Env.get('CLICKSING_CREATE_SING_ENDPOINT')


}