'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  Optons = use('App/Models/Option');
class OptionController {

    async show(){

        return await Optons.all()

    }

}

module.exports = OptionController
