const axios = require('axios')
const express = require('express')
const { envs } = require('./app.env')

const app = express()

app.use(express.json())

const port = envs.PORT

app.post('', async req => {
  await sendToDiscord(
    req.body.resource.definition.name,
    req.body.resource.status,
    req.body.resource.requests[0].requestedFor.displayName
  )
})

app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})

const sendToDiscord = async (repository, status, culprit) => {
  const url = envs.DISCORD_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content: `Build do ${repository} terminou com status ${status} - culpa do ${culprit}`,
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
