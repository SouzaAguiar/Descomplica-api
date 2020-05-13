'use strict'


/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const contestationsDb = use("App/Models/Contestation");

const ContestationHook = exports = module.exports = {}

ContestationHook.fieldsToArray = async (contestations) => {
    

    if(Array.isArray(contestations)){

    
     await contestations.map( contestation =>{

        contestation.attachment = JSON.parse(contestation.attachment)
        contestation.items = JSON.parse(contestation.items)

    })
}else{
    
    contestations.attachment = JSON.parse(contestations.attachment)
    contestations.items = JSON.parse(contestations.items)

}
}
  
ContestationHook.fieldsToString = async (contestation) => {

    contestation.attachment = JSON.stringify(contestation.attachment)
    contestation.items = JSON.stringify(contestation.items)

}

ContestationHook.getOptions = async (contestations) => {

    await Promise.all(
     
      contestations.map( async constestation =>{
      const temp = constestation
      temp.options = await constestation.options().fetch()
      return temp
      })

    )
}

