'use strict'

const AppealReasonHook = exports = module.exports = {}

AppealReasonHook.getOptions = async (appealReasons) => {

    await Promise.all(
     
        appealReasons.map( async appealReason =>{
      const temp = appealReason
      temp.options = await appealReason.options().fetch()
      return temp
      })

    )
}



