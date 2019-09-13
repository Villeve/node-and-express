const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('node-uuid')
const cors = require('cors')

morgan.token('body', function getId(req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(bodyParser.json())
app.use(assignId)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send()
})

function assignId (req, res, next) {
  req.id = uuid.v4()
  //console.log('POST request data:', req.body)
  next()
} 

app.get('/api/persons/', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString()
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(`Phonebook has info for ${persons.length} people \n
   ${currentDate}`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person) {
    res.json(person)
  }
  else res.status(404).end()
})

app.post('/api/persons', (req, res) => {
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