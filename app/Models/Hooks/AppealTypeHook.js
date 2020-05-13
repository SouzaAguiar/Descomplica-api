'use strict'



const AppealTypeHook = exports = module.exports = {}

AppealTypeHook.loadRelations = async (appealsType) => {

  return  await Promise.all( appealsType.map( async appealType =>{

        const temp = appealType
        temp.material = await appealType.contestations().fetch();
        temp.formal = await appealType.appealsType().fetch();
      
        return temp
   
    }))

}

