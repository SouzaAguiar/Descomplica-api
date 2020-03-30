'use strict'

class Language {
    async handle ({ request, response, locale, params, session, antl }, next) {
      antl.switchLocale(locale)
      await next()
    }
  }
  
  module.exports = Language