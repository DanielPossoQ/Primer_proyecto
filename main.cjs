const database = require("./db.json")
const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(express.static('dist'))

const x = database.persons

app.get("/",((req,res)=> {
  res.send(`<h1>Hola!</h1>
  <h2>Phonebok tiene informacion para ${database.persons.length} personas</h2>
  <h3>${new Date()}</h3>
  `)

}))

app.get("/persons",((req,res)=>{
  res.json(database)
}))

app.get("/persons/:id",((req, res)=>{
  const id = req.params.id;
  const person = x.find(person => person.id === id)
  if(!person){
    res.status(400).end()
  }
  console.log(person);
  res.json(person)
}))

app.delete("/persons/:id",((req,res) => {
  const id = req.params.id
  const y = x.filter(person => person.id !== id)
  res.json(y)
  console.log("si se pudo!")

}))

const generateId = () => Math.floor(Math.random() * 1000).toString();

app.use(morgan((tokens,req,res) => {
  if(req.method === 'POST'){
    return [
      tokens.method(req,res),
      tokens.url(req,res),
      JSON.stringify({
        name: req.body.name,
        number: req.body.number
      })
    ].join(" ")
  }
}) )

app.use(cors())
app.post("/persons",((req,res)=>{
  const newPerson = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };
  res.status(201).json(newPerson); 
}))


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})