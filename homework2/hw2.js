import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import * as render from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";

//創建資料庫
const db = new DB("data.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

//尋找網址
const router = new Router();

router.get('/', list)
      .get('/post/new', add)
      .get('/post/:id', read)
      .post('/post', create)

const app = new Application();      
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
    console.log('path=', ctx.request.url.pathname)
    if (ctx.request.url.pathname.startsWith("/public/")) {
      console.log('pass:', ctx.request.url.pathname)
      await send(ctx, ctx.request.url.pathname, {
        root: Deno.cwd(),
        index: "index.html",
      });  
    }
});

//將資料庫裡抓資料放進list
function query(sql) {
    let list = []
    for (const [id, title, body] of db.query(sql)) {
      list.push({id, title, body})
    }  
    return list
}
  
//list function
async function list(ctx){
    let posts = query('Select  id, title, body from posts ')
    console.log('list :posts = ', posts)
    ctx.response.body = await render.list(posts);
}

//new post function
async function add(ctx){
    ctx.response.body = await render.newPost();
}

//create new post function
async function create(ctx){
    const body = ctx.request.body()
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs){
        post[key] = value
    }
    console.log(post)
    db.query('insert into posts(title, body)VALUES(?,?)',[post.title, post.body])
    ctx.response.redirect('/');
    
}

//read post function
async function read(ctx){
    const id = ctx.params.id;
    let post = query(`SELECT id, title, body FROM posts WHERE id=${id}`)
    let body = post[0]
    ctx.response.body = await render.read(body);
}


console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
