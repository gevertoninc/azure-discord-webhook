const express = require('express')
const { envs } = require('./app.env')
const { sendToDiscord } = require('./axios-service')
const { eventTypes } = require('./event-types')

const app = express()

app.use(express.json())

const port = envs.PORT

app.post('/build-complete', async (req, res) => {
  const { body } = req

  const { eventType } = body

  if (eventType !== eventTypes.BUILD_COMPLETE) {
    return res.status(422).send('Wrong event type')
  }

  const {
    resource: {
      definition: { name },
      status,
      requests
    }
  } = body

  const [request] = requests

  const {
    requestedFor: { displayName }
  } = request

  await sendToDiscord(name, status, displayName)

  res.send('Dorime')
})

app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})
