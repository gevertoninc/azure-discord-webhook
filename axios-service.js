const axios = require('axios')
const { envs } = require('./app.env')

const sendToDiscord = async (repository, status, culprit) => {
  const url = envs.DISCORD_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content: `Build do ${repository} terminou com status ${status} - culpa do ${culprit}`,
    username: envs.USERNAME
  }

  await sendTo(url, data)
}

const sendTo = async (url, data) => {
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

module.exports = { sendToDiscord }
