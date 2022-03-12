const axios = require('axios')
const express = require('express')
const { envs } = require('./app.env')

const app = express()

app.use(express.json())

const port = envs.PORT

app.post('', req => {
  console.info('req.requests', req.requests)

  res.send('Ameno')
})

app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})

const sendToDiscord = async () => {
  const url = envs.DISCORD_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content:
      'Build do business-platform-edge-bff terminou com status succeeded',
    username: envs.USERNAME
  }

  try {
    await axios.post(url, data)
  } catch (error) {
    const {
      response: { data, status, statusText }
    } = error

    const outputError = { data, status, statusText }

    console.error(outputError)
  }
}

app.get('', () => {
  sendToDiscord()
})
