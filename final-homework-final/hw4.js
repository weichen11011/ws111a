import {Server, sendJson, bodyParams, sendStatus, Status} from './server.js'
import * as db from './database.js'

db.open()

const server = new Server()
server.public("/public")

server.router.get('/',home)
      .post('/sign',sign)
      .post('/login',login)
      .post('/complete',complete)
      .post('/change',show)
      .get('/choice/:id',choice)
      .post('/schedule',show2)
      .get('/chair/:id',chair)

async function home(ctx) {
    ctx.response.redirect('/public/#home')
} 

async function sign(ctx) {
    const params = await bodyParams(ctx)
    console.log('params=', params)
    let user = await db.userGet(params.user)
    if (user == null) { // user name available
      console.log('signup:params=', params)
      await db.userAdd({user:params.user, pass:params.pass, email:params.email})
      sendStatus(ctx, Status.OK)
    }
    else
      sendStatus(ctx, Status.Fail)
}

async function login(ctx){
  const params = await bodyParams(ctx)
  console.log('params= ', params)
  let user = await db.userGet(params.user)

  if (user != null && params.pass == user.pass){
    await ctx.state.session.set('user', user)
    sendStatus(ctx, Status.OK)
  }
  else{
    sendStatus(ctx, Status.Fail)
  }
}

async function complete(ctx){
  let user = await ctx.state.session.get('user')
   if (user == null) {
    sendStatus(ctx, Status.Fail)
    return
  }else{
    let params = await bodyParams(ctx)
    console.log('params= ', params)
    if (params.dep != "" && params.des != ""){
      await db.userTicketAdd({departure:params.dep, destination:params.des, date:params.date})
      sendStatus(ctx, Status.OK)
    }
    else{
      sendStatus(ctx, Status.Fail)
    }
  }
}

async function show(ctx){
  let ticket = await db.ticketGet()
  console.log('ticket= ', ticket)
  if (ticket == null) {
    sendStatus(ctx, Status.Fail)
  }else{
    await ctx.state.session.set('des', ticket)
    sendJson(ctx, ticket)
  }
  
}

async function choice(ctx){
  let user = await db.ticketGet2(ctx.params['id'])
  console.log(user)
  sendJson(ctx, user)
}

async function show2(ctx){
  let ticket = await db.ticketGet()
  console.log('ticket= ', ticket)
  if (ticket == null) {
    sendStatus(ctx, Status.Fail)
  }else{
    await ctx.state.session.set('dep', ticket)
    sendJson(ctx, ticket)
  }
  
}

async function chair(ctx){
  let user = await db.ticketGet2(ctx.params['id'])
  console.log(user)
  sendJson(ctx, user)
}

await server.listen(8000)