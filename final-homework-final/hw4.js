import {Server, sendJson, bodyParams, sendStatus, Status} from './server.js'
import * as db from './database.js'

db.open()

const server = new Server()
server.public("/public")

server.router.get('/',home)
      .post('/sign',sign)
      .post('/login',login)

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
await server.listen(8000)