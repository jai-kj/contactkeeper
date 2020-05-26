const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

//Connect to Database
connectDB()

//Initialize Middleware
app.use(express.json({ extended: false }))

//Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//Serve Static Assets in Production
if(process.env.NODE_ENV === 'production') {
  //Set Static Folder
  app.use(express.static('frontend/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`)
})