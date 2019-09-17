const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('node-uuid')
const cors = require('cors')
const mongoose = require('mongoose')

morgan.token('body', function getId(req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(bodyParser.json())
app.use(assignId)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

const url =
 `mongodb+srv://fullstack:Fullstack2019@cluster0-hvsqc.mongodb.net/phonebook-app?retryWrites=true&w=majority`

 mongoose.connect(url, { useNewUrlParser: true })

 const personSchema = new mongoose.Schema({
     name: String,
     number: String
 })

 const Person = mongoose.model('Person', personSchema)

app.get('/', (req, res) => {
  res.send()
})

function assignId (req, res, next) {
  req.id = uuid.v4()
  //console.log('POST request data:', req.body)
  next()
} 

app.get('/api/persons/', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString()
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`Phonebook has info for ${Person.length} people \n
   ${currentDate}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.find({}).then(result => {
    result.forEach(result2 => {
      if(result2.id === id) res.json(result2)
      else res.status(404).end()
    })
  })
  //mongoose.connections.close()
})

app.post('/api/persons', (req, res) => {
  
  console.log('req body', req.body.name, req.body.number)
  const personToAdd = new Person({
    name: req.body.name,
    number: req.body.number
  })

  if(personToAdd.name === '' || personToAdd.number === '') {
    return res.status(400).json({
      error: 'Fill both name and number field'
    })
  }
  else {
    Person.find({}).then(result => {
      let counter = 0
      result.forEach(result2 => {
        counter++
        if(result2.name === personToAdd.name) {
          console.log('HIT')
          counter--
          return res.status(400).json({
            error: 'Name must be unique'
          })
        }
        if(counter === result.length) {
          console.log('SAVED')
          personToAdd.save()
          res.json(personToAdd)
        }
      })
    })
    //personToAdd.save()
  }
  

    /*
    result.forEach(result2 => {
      if(result2.name === personToAdd.name) {
        return res.status(400).json({
          error: 'name must be unique'
        })
      }
      else {
        personToAdd.save()
      }
      
    })
    */
  
/*
  const person = req.body
  const rand = Math.floor(Math.random() * Math.floor(10000000))
  const filteredPersons = persons.filter(pers => pers.name === person.name)

  if(filteredPersons.length !== 0) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  if(person.name === '' || person.number === '') {
    return res.status(400).json({
      error: 'Fill both name and number field'
    })
  }
  person.id = rand
  persons = persons.concat(person)

  res.json(person)
  */
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let persons = [
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]