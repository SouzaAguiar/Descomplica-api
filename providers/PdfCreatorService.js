'use strict'



 const fs = require('fs').promises
 //const appeal = require('../appeal.json')
 const pdf = require('html-pdf');
 const options = { format: 'A4',border: "1in" };
 const edge = require('edge.js')
 edge.registerViews('../app/resources/views')


 class PdfCreatorService {


  async generatePdf(appeal,fileName){
  let anexosCount = 0;


    const html = edge.render('appeals/layout',{appeal,template:'appeals/'+appeal.type.template })
    pdf.create(html, options).toFile(`./tmp/${fileName}`, function(err, res) {
    if (err) {return console.log(err);}
    return fileName
    });
   
   }
 
  

  }

  

module.exports = PdfCreatorService
