'use strict'

const OptionHook = exports = module.exports = {}


OptionHook.fieldsToArray = async (options) => {
    

    if(Array.isArray(options)){

    
     await options.map( option =>{

        option.attachment = JSON.parse(option.attachment)
    
    })
}else{
    
    options.attachment = JSON.parse(options.attachment)


}
}

OptionHook.fieldsToString = async (option) => {

    option.attachment = JSON.stringify(option.attachment)

}