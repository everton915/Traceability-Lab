const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'de9ec934266f4a9881098fe227981b8d',
  captureUncaught: true,
  captureUnhandledRejections: true
})

app.use(express.json())

app.use("/styles.css", express.static(path.join(__dirname, '/public/styles.css')))

app.get('/', function(req, res) {
  rollbar.log('Hello, I am Rolllbar!')
  res.sendFile(path.join(__dirname, '/public/index.html'))

  try{ 
    fakeFunction() 
  } catch (err){
    rollbar.error(err)
    return res.sendStatus(400)
  }
 
})



const port = process.env.PORT || 4545

app.use(rollbar.errorHandler('Error is here'))

app.listen(port, function() {
  console.log(`Server is blaring the bumps on ${port}`)
})