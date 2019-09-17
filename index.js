require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const uuid = require('node-uuid')
const cors = require('cors')
//const mongoose = require('mongoose')
const Person = require('./models/person')

morgan.token('body', function getId(req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(assignId)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())


/*
const url =
 `mongodb+srv://fullstack:asd@cluster0-hvsqc.mongodb.net/phonebook-app?retryWrites=true&w=majority`
*/
 /*
 mongoose.connect(url, { useNewUrlParser: true })

 const personSchema = new mongoose.Schema({
     name: String,
     number: String
 })

 const Person = mongoose.model('Person', personSchema)
*/
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

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.find({}).then(result => {
    result.forEach(result2 => {
      if(result2.id === id) res.json(result2)
      else res.status(404).end()
    })
  })
  .catch(error => next(error))
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
    .catch(error => next(error))
  }
})

// Error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)


app.delete('/api/persons/:id', (req, res, next) => {
  console.log('Starting removal process')
  console.log('using id', req.params.id)
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})