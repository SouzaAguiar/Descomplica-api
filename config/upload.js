const Env = use('Env')

module.exports = {
   filePath : `${Env.get('APP_URL')}/file`,
   IBMconfig: {
      endpoint: Env.get('IBM_END_POINT'),
      apiKeyId:Env.get('IBM_API_KEY_ID') ,
      ibmAuthEndpoint:Env.get('IBM_AUTH_END_PIONT') ,
      serviceInstanceId:Env.get('IBM_SERVICE_INSTANCE_ID') ,
      cos_hmac_keys: {
        access_key_id:Env.get('IBM_HMAC_ACCESS_KEY') ,
        secret_access_key: Env.get('IBM_HMAC_SECRET_ACCESS_KEY')
      }
}
 
    

 
 };
