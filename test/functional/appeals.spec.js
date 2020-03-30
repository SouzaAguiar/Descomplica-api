const {test, trait} = use('Test/Suite')('Appeals');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const  appelType = use('App/Models/AppealsType');
const  appelReason =use ('App/Models/AppealReason');
const  defenseType = use ('App/Models/DefenceType');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const defenseIssues= use ('App/Models/DefenseIssue');
const issuesResponse= use ('App/Models/IssueResponse');


trait('DatabaseTransactions')
trait('Test/ApiClient')


test('it should be able to create appels', async ({assert,client})=>{
    const sessinsPayload ={
        email:'johnnyz.jonathan@gmail.com',
        password:'123456'
    }
const user = await Factory
.model('App/Models/User')
.create(sessinsPayload)


const AppelType= await appelType.create({'title':'Velocidade de 21 a 50%','description':'Multa por trafegar entre 21 e 50%do permitido.'});
const AppelReason = await appelReason.create({'description':'Falta de sinalização ou inadequada'});
const DefenseIssues = await defenseIssues.create({'appeal_reasons_id':AppelReason.id,'issue':'Em área urbana, se a velocidade eramenor que 80km/h, havia plana entre100 a 400 metros antes?'});
const DefenseType = await defenseType.create({'description':'Defesa prévia'});
const IssuesResponse = await issuesResponse.create({'issue_id':DefenseIssues.id,'response':'true'});


const response = await client
.post('/appeals')
.send({
'type_id':AppelType.id,
'defense_type_id':DefenseType.id,
'appeal_reason_id':AppelReason.id,
'user_id':user.id,
'assessmentNumber':'1234',
'taxing_entity':'123',
'brand':'123',
'model':'123',
'license_plate':'123',
'url_img_docment':'123',
'conductor_type':'Pessoa Fisica'

})
.end()

response.assertStatus(201);
//assert.exists(response.body.token);
});