'use strict'



 const fs = require('fs').promises
 const appeal = require('../appeal.json')
 const pdf = require('html-pdf');
 const options = { format: 'A4',border: "1in" };
 const edge = require('edge.js')
 edge.registerViews('../app/resources/views')

 class PdfCreatorService {


  async generatePdf(){

  let anexosCount = 0;
    const appealName = `${appeal.id}-${appeal.conductor.conductor_docment_number}.pdf`

    const html = edge.render('appeals/layout',{appeal,template:appeal.type.template })

    pdf.create(html, options).toFile(`./tmp/${appealName}`, function(err, res) {
    if (err) return console.log(err);
      
    });
 return appealName
   }
 
 

  

  }

  

module.exports = PdfCreatorService
