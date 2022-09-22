import { Application } from "https://deno.land/x/oak/mod.ts";
const app = new Application();

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/sign-in/">
            <link rel="stylesheet" href="login.css">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>         
                .container{
                  position: absolute;
                  left: 50%;
                  top: 37%;
                  height: 400px;
                  margin-top: -150px ;
                  width: 300px;
                  margin-left: -200px; 
                  border:1px solid rgb(218, 220, 224);
                  border-radius: 8px;
                  padding: 30px 50px;
                  display: flex;
                  flex-direction: column;
                }
                .title{
                  display: flex;
                  height: 50px;
                  padding: 5px 10px;
                  align-items: center;
                  justify-content: center;
                }
                /* Input form Style */
                input[type="text"], input[type="password"] {
                  border: 2px solid #afbdcf;
                  border-radius: 15px;
                  height: 47px;
                  width:300px;
                  color: #000000;
                  font-size: 14px;
                  box-shadow: none;  
                  padding-left: 20px;
                }

                /* Label style after Input feild is in focus. Can also use input:focus ~ label to select sibling. */

                input:focus + label, input:valid + label{
                  font-size: 12px;
                  color: #afbdcf;
                  top: -5px;
                  left:10px;
                  background: #ffffff;
                  padding: 0px 5px 0px 5px;
                }

                .input_wrap {
                  width:auto; 
                  height:auto; 
                  position:relative;
                  margin-top:30px;
                  margin-bottom: 10px;
                }

                .input_wrap label {
                  font-family:arial;
                  font-size:16px;
                  color: #afbdcf;
                  padding: 14px;
                  position: absolute;
                  top: 0;
                  left: 0;
                  transition:0.2s ease all; 
                  -moz-transition:0.2s ease all; 
                  -webkit-transition:0.2s ease all;
                  pointer-events: none;

                }

                input[type="text"]:focus {outline:none;}
                .btn{
                background-color: rgb(10,102,194);
                color: white;
                font-weight: bold;
                border: none;
                border-radius: 30px;
                cursor: pointer;
                transition: background-color 0.15s;
                height: 60px;
                width: 330px;
                margin-top: 30px;
                }
                .btn:hover{
                background-color: rgb(6, 62, 117);
                }
                .font{
                  font-size: 24px;
                  font-weight: bold;
                }
                .body{
                  font-family:Roboto,Arial;
                  font-size:24px;
                }
              </style>
        </head>
        <body>
            <div class="container">
                <div class="title">
                    <p class="font">Login in</p>
                </div>
                <div class="form_wrap">
                    <div class="input_wrap">
                        <input type="text" name="user" required/>
                        <label>Username</label>
                    </div>    
                    <div class="input_wrap">
                        <input type="password" name="password" required/>
                        <label>Password</label>  
                    </div>  
                </div>
                  
                <div class="button-type">
                    <button class="btn">Login</button>
                </div>
        </body>
    
    </html>
    `
  } else {
    ctx.response.body = `
    <!DOCTYPE html>
    <html>
        <head>
    
        </head>
        <body>
            <h1>我的網站</h1>
            <input type="button" value="login" onclick="location.href='http://127.0.0.1:8000/login'">
        </body>
    </html>
    `
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

