'use strict'

const AppealHook = exports = module.exports = {}

AppealHook.loadRelations = async (appeals) => {
    
    return  await Promise.all( appeals.map( async appeal =>{

        const temp = appeal
        temp.user = await appeal.user().fetch();
        temp.conductor = await appeal.conductor().fetch();
        temp.vehicle = await appeal.vehicle().fetch();
        temp.type = await appeal.appealsType().fetch();
        temp.contestations = JSON.parse(temp.contestations)
        return temp
   
    }))
}
