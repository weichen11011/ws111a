import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db = null

export async function open() {
  db = new DB("say.db");
  db.query(`CREATE TABLE IF NOT EXISTS users 
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               user TEXT, pass TEXT, email TEXT)`)
  db.query(`CREATE TABLE IF NOT EXISTS tickets
              (id INTEGER PRIMARY KEY AUTOINCREMENT, 
               departure TEXT, destination TEXT , date TEXT)`)
}



export async function close() {
  db.close()
}

export async function userAdd(user) {
  db.query(`INSERT INTO users (user, pass, email) 
                       VALUES (?,    ?,  ?)`, 
                       [user.user, user.pass, user.email])
}

export async function userTicketAdd(ticket) {
  db.query(`INSERT INTO tickets (departure,destination,date) VALUES (?, ?, ?)`,[ticket.departure,ticket.destination,ticket.date])
}

export async function ticketGet() {
  let q = db.query(`SELECT id, departure, destination, date FROM tickets`,[])
  let tickets = []
  console.log(`ticketGet=${q}`)
  if (q.length <=0) return null
  for (let [id, des, dep, date] of q) {
    tickets.push({id, des, dep, date})
  }
  return tickets
}

export async function ticketGet2(user1) {
  let q = db.query(`SELECT id, departure, destination, date FROM tickets WHERE id=?`, [user1])
  console.log(`userGet(${user1})=${q}`)
  if (q.length <=0) return null
  let [id, des, dep, date] = q[0]
  return {id, des, dep, date}
}


export async function userGet(user1) {
  let q = db.query(`SELECT id, user, pass, email FROM users WHERE user=?`, [user1])
  console.log(`userGet(${user1})=${q}`)
  if (q.length <=0) return null
  let [id, user, pass, email] = q[0]
  return {id, user, pass, email}
}
  
