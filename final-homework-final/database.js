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

export async function clear() {
  db.query(`DELETE FROM users`)
  db.query(`DELETE FROM says`)
  db.query(`DELETE FROM follows`)
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
  for (let a of q) {
    tickets.push(a)
  }
  return tickets
}


export async function userGet(user1) {
  let q = db.query(`SELECT id, user, pass, email FROM users WHERE user=?`, [user1])
  console.log(`userGet(${user1})=${q}`)
  if (q.length <=0) return null
  let [id, user, pass, email] = q[0]
  return {id, user, pass, email}
}
  
