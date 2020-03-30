'use strict'

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

Route.post('/ApealsReason/create','AppealsReasonController.store')
Route.get('/ApealsReason','AppealsReasonController.index')

Route.post('/Appeals/create','AppealController.store')


Route.post('/ApealsType/create','AppealsTypeController.store')
Route.get('/ApealsType','AppealsTypeController.show')


Route.post('/Conductor/create','ConductorController.store')

Route.post('/Vehicle/create','VehicleController.store')



Route.group(()=>{
  Route.post('/appeals','AppealController.store');
  Route.post('/image/upload','ImageController.store')
  Route.get('/user','UserController.show')
  Route.get('/images','ImageController.index')

  Route.post('/user/update','UserController.update')
  
  Route.get('appeals','AppealController.index')

}).middleware('auth')



Route.get('/', () => {
    return {'Descomplica api':'Bem vindo!'}
  });

  