const { subHours, format } = require('date-fns');
const {test, trait,beforeEach,afterEach} = use('Test/Suite')('Forgot Password');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  User = use('App/Models/User');

trait('Test/ApiClient')
trait('DatabaseTransactions')

const Mail = use('Mail')
const Hash = use('Hash')
const Database = use('Database');

beforeEach(()=>{
  Mail.fake()
});

afterEach(()=>{
  Mail.restore()
})
 
async function gerateForgotPasswordToken(email ,client){

const user = await Factory
.model('App/Models/User')
.create({email})

await client
.post('/forgot')
.send({email})
.end()

const token = await user.tokens().first();
return token;

}

test('it should send email with reset password instructions', async ({assert,client})=>{
  
    const email='johnnyz.jonathan@gmail.com'
    const token =  await gerateForgotPasswordToken(email,client);
    

const recentEmail = Mail.pullRecent()
assert.equal(recentEmail.message.to[0].address,email)

assert.include(token.toJSON(),{
  type:'forgotPassword'
});
 
;
});

test('it should be able reset password' ,async({assert,client})=>{
  const email='johnnyz.jonathan@gmail.com'
  const user = await Factory.model('App/Models/User').create({ email });
  const  Usertoken  =  await Factory.model('App/Models/Token').make();
  await user.tokens().save(Usertoken);


const response = await client.post('/reset')
  .send({
    token: Usertoken.Token,
    password:'123456',
    password_confirmation:'123456'
  })
  .end();
  await user.reload();
  const checkPassaword = await Hash.verify('123456',user.password);

  assert.isTrue(checkPassaword);

});

test('it cannot reset passworld after 2h of forgot request',async ({assert,client})=>{

  const email='johnnyz.jonathan@gmail.com'
  const user = await Factory.model('App/Models/User').create({ email });
  const Usertoken  =  await Factory.model('App/Models/Token').make();
  await user.tokens().save(Usertoken);


  const dateWithSub = format(subHours(new Date(),5,),'yyyy-MM-dd HH:ii:ss');

  
   await Database 
   .table('tokens') 
   .where('token', Usertoken.Token) 
   .update('created_at',dateWithSub) 
   
   await Usertoken.reload();

 
   const response = await client.post('/reset')
  .send({
    token: Usertoken.token,
    password:'123456',
    password_confirmation:'123456'
  })
  .end();

//console.log(response)
  response.assertStatus(400);

});