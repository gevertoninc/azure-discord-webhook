const { envs } = require('./app.env')
const express = require('express')

const app = express()

const port = envs.PORT

app.get('/', (req, res) => {
  console.log('req', req)
  res.send('Dorime')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
