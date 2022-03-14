const axios = require('axios')
const { envs } = require('./app.env')

const sendBuildCompleteInfoToDiscord = async (repository, status, culprit) => {
  const discordUrl = envs.BUILD_COMPLETE_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content: `Build do ${repository} terminou com status ${status} - culpa do ${culprit}`,
    username: envs.USERNAME
  }

  await send(discordUrl, data)
}

const sendGitPullRequestCreatedInfoToDiscord = async (
  source,
  target,
  repository,
  culprit,
  title,
  description,
  prUrl
) => {
  const discordUrl = envs.GIT_PULLREQUEST_CREATED_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content: `PR da ${source} para a ${target} do ${repository} criada pelo ${culprit} - título: ${title}, descrição: ${description}, URL: ${prUrl}`,
    username: envs.USERNAME
  }

  await send(discordUrl, data)
}

const sendMsVssCodeGitPullRequestCommentEventInfoToDiscord = async (
  author,
  number,
  content,
  url
) => {
  const discordUrl = envs.GIT_PULLREQUEST_CREATED_URL

  const data = {
    avatar_url: envs.AVATAR_URL,
    content: `${author} comentou na PR ${number}: ${content} - link: ${url}`,
    username: envs.USERNAME
  }

  await send(discordUrl, data)
}

const send = async (url, data) => {
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

module.exports = {
  sendBuildCompleteInfoToDiscord,
  sendGitPullRequestCreatedInfoToDiscord,
  sendMsVssCodeGitPullRequestCommentEventInfoToDiscord
}
