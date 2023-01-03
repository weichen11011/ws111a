
// ========================= Ui ======================
const Ui = {}
  Ui.one = function(path) {
    return document.querySelector(path)
  }
  
  Ui.show = function (html) {
    Ui.id('main').innerHTML = html
  }
  
  Ui.goto = function (hash) {
    window.location.hash = hash
  }
  Ui.id = function(path) {
    return document.getElementById(path)
  }

window.onhashchange = async function(){
    var tokens = window.location.hash.split('/')
    console.log('tokens=', tokens)
    switch (tokens[0]){
        case '#home':
            await home()
            break
        case '#sign':
            await sign()
            break    
        case '#login':
            await login()
            break 
        case '#complete':
            await complete()
            break
        case '#change':
            await show()
            break   
        case '#choice':
            let id = tokens[1]
            await choice(id)
            break                
        default: 
            Ui.goto('#home'); 
            break

    }
}

window.onload = function () {
    window.onhashchange()
}

async function home(){
    Ui.show(`<!DOCTYPE html>
    <html>
        <head>
            <title>AirLine Ticket System</title>
            <link rel="stylesheet" href="header.css"/>
            <link rel="stylesheet" href="select.css"/>
            <meta charset="utf-8">
        </head>
    
        <body>
            <div class="big-container">
                <div class="top">
                </div>
                <div class ="header">
                    <div class = "mid-section">
                        <div class = "right">
                            <div class="home">
                                <a id="home" href="#home">首頁</a>
                            </div>
                            <div class="login">
                                <a id="login" href="#login">登入</a>
                            </div>
                            <div class="sign">
                                <a id="sign" href="#sign">註冊</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third">
                    <div class="container">
                        <div class="select">
            
                            <div class="introduction">
                                <p class="font">訂位購票</p>
                            </div>
                
                            <div class="choice-des">
                                <div class="departure">
                                    <select class="dep" name="啟程地" id="departure">
                                        <option value="">啟程地</option>
                                        <option value="松山">松山</option>
                                        <option value="台中">台中</option>
                                        <option value="嘉義">嘉義</option>
                                        <option value="台南">台南</option>
                                        <option value="高雄">高雄</option>
                                    </select>
                                </div>
                
                                <div class="destination" >
                                    <select class="des" name="目的地" id="destination">
                                        <option value="">目的地</option>
                                        <option value="澎湖">澎湖</option>
                                        <option value="金門">金門</option>
                                    </select>
                                </div>
                
                                <div class="date">
                                    <input type="date" placeholder="出發日期" name="date" id="date"
                                    class="datetime"/>
                                </div>
                            </div>
                
                            <div class="search">
                                <a id="ticket" href="#complete">訂購</a>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div class="forth">
                    <div class="pic-container">
                        <div class="change">
                            <a id="change" href="#change">
                                <img src="./images.png" class="pic-type">
                            </a>
                            <p class="font2">線上劃位</p>
                        </div>
        
                        <div class="show">
                            <a id="show" href="#show">
                                <img src="./images2.png" class="pic-type">
                            </a>
                            <p class="font2">行程管理</p>
                        </div>
                    </div>
    
                </div>
    
            </div>
        </body>
    </html>`)
}


async function sign(){
    Ui.show(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Login</title>
            <link rel="stylesheet" href="header.css"/>
            <link rel="stylesheet" href="login.css"/>
            <meta charset="utf-8">
        </head>
    
        <body>
            <div class="big-container">
                <div class="top">
                </div>
                <div class ="header">
                    <div class = "mid-section">
                        <div class = "right">
                            <div class="home">
                                <a id="home" href="#home">首頁</a>
                            </div>
                            <div class="login">
                                <a id="login" href="#login">登入</a>
                            </div>
                            <div class="sign">
                                <a id="sign" href="#sign">註冊</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third">
                    <div class="container">
                        <div class="title">
                            <p class="font">Sign Up</p>
                        </div>
                        <div class="form_wrap">
                            <div class="input_wrap">
                                <input type="text" name="user" id="user" required />
                                <label>Username</label>
                            </div>    
                            <div class="input_wrap">
                                <input type="password" name="password" id = "password" required/>
                                <label>Password</label>  
                            </div>  
                            <div class="input_wrap">
                                <input type="email" name="email" id = "email" required/>
                                <label>Email</label>  
                            </div>
                        </div>
                          
                        <div class="sign">
                            <button class="btn" id = "btn" onclick="serversign()">Sign up</button>
                        </div>
                </div>
                </div>
            </div>
        </body>
    </html>
    `)
}

async function serversign(){
    let user = Ui.id('user').value
    let pass = Ui.id('password').value
    let email = Ui.id('email').value
    let r = await Server.post('/sign', {user, pass, email})
    console.log('serverLogin: r=', r)
    if (r.status == Status.OK) {
        alert('註冊成功!!!!')
        Ui.goto('#home')
    }
    else{
        alert('Error!!!!')
    }
  
}

async function login(){
    Ui.show(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Login</title>
            <link rel="stylesheet" href="header.css"/>
            <link rel="stylesheet" href="login.css"/>
            <meta charset="utf-8">
        </head>

        <body>
            <div class="big-container">
                <div class="top">
                </div>
                <div class ="header">
                    <div class = "mid-section">
                        <div class = "right">
                            <div class="home">
                                <a id="home" href="#home">首頁</a>
                            </div>
                            <div class="login">
                                <a id="login" href="#login">登入</a>
                            </div>
                            <div class="sign">
                                <a id="sign" href="#sign">註冊</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third">
                    <div class="container">
                        <div class="title">
                            <p class="font">Login</p>
                        </div>
                        <div class="form_wrap">
                            <div class="input_wrap">
                                <input type="text" name="user" id ="user"  required />
                                <label>Username</label>
                            </div>    
                            <div class="input_wrap">
                                <input type="password" name="password" id ="password" required/>
                                <label>Password</label>  
                            </div>
                            
                        </div>
                        
                        <div class="sign">
                            <input type="button" value="Login" onclick="serverlogin()" class="btn"/>
                        </div>
                </div>
                </div>
            </div>
        </body>
    </html>`)
}

async function serverlogin(){
    let user = Ui.id('user').value
    let pass = Ui.id('password').value
    let r = await Server.post('/login', {user, pass})
    console.log('serverLogin: r=', r)
    if (r.status == Status.OK) {
        alert('登入成功!!!')
        Ui.goto('#home')
    }
    else{
        alert('帳號或密碼錯誤')
    }
}


async function complete(){
    let dep = Ui.id('departure').value
    let des = Ui.id('destination').value
    let date = Ui.id('date').value

    let r = await Server.post('/complete', {dep, des, date})
    console.log('serverLogin: r=', r)

    if (r.status == Status.OK){
        alert('機票訂購完成!!!')
        Ui.goto('#home')
    }
    else{
        alert('請先登入!!!')
        Ui.goto('#home')
    }
}

async function show(tickets){
    let r = await Server.post('/change',tickets)
    let msgs = r.obj
    let content = []
    console.log('r = ',r)
    for (let i = 0; i < msgs.length; i++){
        content.push(`
        <div class="container1">
            <div class="font">
                <p id="dep">${[msgs[i][1]]}</p>
            </div>

            <div class="font">
                <p id="des" >${[msgs[i][2]]}</p>
            </div>

            <div class="font">
                <p id="date" >${[msgs[i][3]]}</p>
            </div>

            <div>
                <a id="show" href="#choice/${msgs[i][0]}" class="choice">選擇</a>
            </div>
        </div>
    `)
    }
    if (r.status == Status.OK){
        Ui.show(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>choice</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="choice.css">
            <link rel="stylesheet" href="header1.css"/>
        </head>
    
        <body>
            <div class="big-container">
                <div class="top">
                </div>
                <div class ="header">
                    <div class = "mid-section">
                        <div class = "right">
                            <div class="home">
                                <a id="home" href="#home">首頁</a>
                            </div>
                            <div class="login">
                                <a id="login" href="#login">登入</a>
                            </div>
                            <div class="sign">
                                <a id="sign" href="#sign">註冊</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="third">
                    ${content.join("\n")}
                    </div>
                </div>
                </div>
            </div>
        </body>
    </html>
    `)
    }
    else{
        alert('你還尚未訂購機票!!!')
        Ui.goto('#home')
    }
    
}

async function choice(id){
    id1 = 'dep'+id
    id2 = 'des'+id
    id3 = 'date'+id

    let dep = Ui.id('dep').value
    let des = Ui.id(id2).value
    let date = Ui.id(id3).value

    console.log(dep, id2, date)

    Ui.show(`
    <div class="container1">
        <div class="font">
            <p>${dep}</p>
        </div>

        <div class="font">
            <p>${des}</p>
        </div>

        <div class="font">
            <p>${date}</p>
        </div>

        <div >
            <a id="show" href="#choice" class="choice">選擇</a>
    </div>
</div>
    `)
}
    



// ====================== Server ====================
Server = {}

Server.get = async function(path) {
  let r = await window.fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return {status:r.status, obj:await r.json()}
}

Server.post = async function(path, params) {
  let r = await window.fetch(path, {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return {status:r.status, obj:await r.json()}
  //if (mode != "alert") return r.status==200
  //if (r.status == 200)
  //  alert("上傳成功！")
  //else
  //  alert("上傳失敗: 原因是 "+r.statusText)
}

const Status = {
    OK:200,
    Fail:400,
    Unauthorized:401,
    Forbidden:403,
    NotFound:404,
  }
  