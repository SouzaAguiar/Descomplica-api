"use strict";
const { isBefore, subHours, parseISO } = require("date-fns");
const Mail = use("Mail");

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use("App/Models/User");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use("App/Models/Token");

const UploadSevice = use('Adonis/Services/UploadImage')


class UserController {

  
  async forgotPasswor({ request, auth }) {
    const email = request.input("email")
  

    const user = await User.findByOrFail("email", email)

    const { token } = await await auth.generate(user)

    await user.tokens().create({
      token,
      type: "forgotPassword"
    });
    const forgotPasswordUrl = `${Env.get("FRONT_URL")}/reset?token=${token}`
    
  
    await Mail.send(
      "emails.forgotPassword",
      { name: user.name,forgotPasswordUrl:forgotPasswordUrl },
      message => {
        message
          .to(user.email)
          .from("descomplicar@gmail.com")
          .subject("Descomplicar-Recuperação de senha");
      }
    );
  }

  async register({ request }) {
    const { email, password, name, gender, state, city } = request.only([
      "email",
      "password",
      "name",
      "gender",
      "state",
      "city"
    ]);

    await User.create({ email, password, name, gender, state, city });
  }

  async resetPassword({ request, response }) {
    const data = request.only(["token", "password"]);

    const userToken = await Token.findByOrFail("token", data.token);

    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 2))) {
      return response
        .status(400)
        .json({ error: "Token expired, please try agan." });
    }

    const user = await userToken.user().fetch();

    user.password = data.password;
    await user.save();
  }

  async store({ request, auth }) {
    const { email, password } = request.only(["email", "password"]);
    const { token } = await auth.attempt(email, password);
    return { token };
  }

  async show({auth}){
    
    const user = auth.user
   
 user['vehicles']=await  user.vehicles().fetch()
 user['conductors']=await user.conductors().fetch()

  return auth.user
  
  }

  
async update({request,auth}){

  const data = request.all()
  console.log(data)
  const user = auth.user
  user.merge(data)
  await user.save();

  
  
}

async saveAvatar({ auth,request }){
  
  const user = await auth.user
  const avatar = request.file('avatar',{type:['image'],size:'4mb'})
  
    const  UrlImg = await UploadSevice.upload(avatar)
   
  user.merge({UrlImg})
  await user.save();

}
}


module.exports = UserController;
