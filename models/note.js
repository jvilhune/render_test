const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

/* mongoose library cant't read the url from the .env file because there is '&' character in the url */
//const url = process.env.MONGODB_URI
const url = `mongodb+srv://jvmongodb:opto4646asdf@cluster0.dvmusb2.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)