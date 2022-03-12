const axios = require('axios')
const express = require('express')
const { envs } = require('./app.env')

const app = express()

app.use(express.json())

const port = envs.PORT

app.post('', req => {
  console.log('req.requests', req.requests)

  res.send('Ameno')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
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
    const response = await axios.post(url, data)

    console.info('response', response)
  } catch (error) {
    console.error('error', error)
  }
}

app.get('', () => {
  sendToDiscord()
})
