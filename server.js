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
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT || 4545

app.listen(port, function() {
  rollbar.log('Hello, I am Rolllbar!')
  console.log(`Server is blaring the bumps on ${port}`)
})