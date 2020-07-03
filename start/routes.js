'use strict'
const pdf =  use('Adonis/Services/PdfCreator')
const Helpers = use('Helpers')
const UploadSevice = use('Adonis/Services/UploadImage')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions','UserController.store').validator('UserSessions');;
Route.post('/forgot','UserController.forgotPasswor');
Route.post('/reset','UserController.resetPassword');
Route.post('/register','UserController.register').validator('StoreUser');



Route.post('/App/Params/price','AppParamController.upDatePrice').middleware('authAdmin')
Route.post('/App/Params/init','AppParamController.appInitParams').middleware('authAdmin')
Route.post('/App/Params/deadline','AppParamController.upDateDeadLine').middleware('authAdmin')
Route.get('/users','UserController.index').middleware('authAdmin')

Route.get('/messages/all','MenssageController.getAllMessage').middleware('authAdmin')
Route.put('/messages/setHasRead/:id','MenssageController.setHasRead').middleware('authAdmin')
Route.get('/messages/getNotRead','MenssageController.getNotReadMessesages').middleware('authAdmin')


Route.post('/user/admin','UserController.adminRegister').middleware('authAdmin').validator('StoreUser');
Route.delete('/user/:id','UserController.delete').middleware('authAdmin')

Route.get('/appeals/all','AppealController.getAll').middleware('authAdmin')

Route.post('/ApealsType/create','AppealsTypeController.store').middleware('authAdmin')


Route.post('Payment/installments','PaymentController.getInstallments')
Route.get('/file/:fileName', async ({response,params})=>{
  console.log('dawnloading')
   return response.download(Helpers.tmpPath(`uploads/${params.fileName}`))
 })
Route.group(()=>{

  Route.get('/images','ImageController.index')
  Route.post('/image/upload','ImageController.store')

  Route.get('/user','UserController.show')
  Route.post('/user/update','UserController.update')
  Route.post('/user/avatar','UserController.saveAvatar')
  Route.post('/user/block','UserController.block').middleware('authAdmin')

  Route.post('/user/menssage/create','MenssageController.store')
  Route.get('/user/menssages','UserController.getMenssages')
  Route.delete('/user/menssage/delete/:id','MenssageController.delete')

  


  Route.post('/user/sing','UserController.sing')

  Route.post('/Contestation/option/create','ContestationController.createOptions')
  Route.get('/Contestation/options','OptionController.show')
  Route.post('/Contestation/update/:id','ContestationController.update')

 
  Route.post('/appeals/update/:id','AppealController.update');
  Route.post('/Appeals/create','AppealController.store')

  Route.get('appeals','AppealController.index')
  Route.get('/ApealsType','AppealsTypeController.show')
  Route.post('/ApealsReason/create','AppealsReasonController.store')
  Route.get('/ApealsReason','AppealsReasonController.index')
  Route.post('/ApealsReason/update/:id','AppealsReasonController.update')

  Route.post('/ApealsType/update/:id','AppealsTypeController.update')

  Route.post('/Contestation/create','ContestationController.store')
  Route.get('/Contestations','ContestationController.index')

  
  Route.post('/Vehicle/create','VehicleController.store')
  Route.delete('/Vehicle/delete/:id','VehicleController.destroy')
  Route.post('/Vehicle/update','VehicleController.update')

  Route.post('/Conductor/create','ConductorController.store')
  Route.delete('/Conductor/delete/:id','ConductorController.destroy')
  Route.post('/Conductor/update','ConductorController.update')
  


  Route.post('CreditCard/create','CreditCardController.store')
  Route.get('CreditCards','CreditCardController.show')
  Route.delete('/CreditCard','CreditCardController.delete')

  Route.post('Payment/create','PaymentController.store')
  Route.post('CreditCard/createAndPay','PaymentController.createAndPay')
  Route.get('/App/Params','AppParamController.show')

}).middleware('auth')

Route.get('/', () => {
    return {'Descomplica api':'Bem vindo!'}
  });
 
   
  Route.get('/pdf',() =>{
    UploadSevice.upload({})
    return {'result':'ok'}
  })