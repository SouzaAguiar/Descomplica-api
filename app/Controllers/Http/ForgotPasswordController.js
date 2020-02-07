'use strict'

const Mail = use('Mail')

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  User = use('App/Models/User');

class ForgotPasswordController {
    async store({ request,auth }){
        const email = request.input('email');

        const user = await User.findByOrFail('email',email);
       
        const { token } = await await auth.generate(user);

        await user.tokens().create({
            token,
            type :'forgotPassword'
    })

        const forgotPasswordUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;
    
        await Mail.send('emails.forgotPassword', 
        {name: user.name,forgotPasswordUrl},
         (message) => {
            message
              .to(user.email)
              .from('descomplicar@gmail.com')
              .subject('Descomplicar-Recuperação de senha')
          })

    }
}

module.exports = ForgotPasswordController
