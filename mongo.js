const mongoose = require('mongoose')

const password = process.argv[2]
const personToAdd = process.argv[3]
const numberToAdd = process.argv[4]

const url =
 `mongodb+srv://fullstack:${password}@cluster0-hvsqc.mongodb.net/phonebook-app?retryWrites=true&w=majority`

 mongoose.connect(url, { useNewUrlParser: true })

 const personSchema = new mongoose.Schema({
     name: String,
     number: String
 })

 const Person = mongoose.model('Person', personSchema)

 const person = new Person({
     name: personToAdd,
     number: numberToAdd
 })

 if(process.argv.length<4) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    }).then(response => {
        process.exit(1)
    })
}

person.save().then(response => {
     console.log(`added ${personToAdd} number ${numberToAdd} to phonebook`)
     mongoose.connection.close()
 })