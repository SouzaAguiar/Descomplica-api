'use strict'


 const fs = require('fs').promises
 //const appeal = require('../appeal.json')
 const pdf = require('html-pdf');
 const options = { format: 'A4',border: "1in",timeout: '100000' };
 const edge = require('edge.js')
 const Helpers = use('Helpers')
 edge.registerViews('../app/resources/views')
 




 class PdfCreatorService {


  async generatePdf(appeal,fileName,UploadSevice){
  let anexosCount = 0;

  console.log(appeal.attchments)
  
  
      const html = edge.render('appeals/layout',{appeal,template:'appeals/'+appeal.type.template,basePath:Helpers.tmpPath('uploads') })
    pdf.create(html, options).toFile(`./tmp/uploads/${fileName}`, function(err, res) {
    if (err) {return console.log(err);}
    UploadSevice.uploadFileByPath(Helpers.tmpPath(`uploads/${fileName}`))
    return fileName
    });
 
   
   }

   
 
  

  }

  

module.exports = PdfCreatorService
