'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

Route.on('/Home').render('home')

Route.get('/persons','UserController.index')

Route.get('/persons/add','UserController.add')

Route.get('/persons/edit/:id','UserController.edit')

Route.get('/persons/:id','UserController.details')

Route.post('/persons','UserController.store')

Route.put('/persons/:id','UserController.update')

Route.delete('/persons/:id','UserController.destroy')

Route.get('/get','UserController.get')
//Route.on('/Nav').render('include.navbar')
