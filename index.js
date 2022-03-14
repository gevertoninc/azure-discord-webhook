const express = require('express')
const { envs } = require('./app.env')
const {
  sendBuildCompleteInfoToDiscord,
  sendGitPullRequestCreatedInfoToDiscord,
  sendMsVssCodeGitPullRequestCommentEventInfoToDiscord
} = require('./axios-service')
const { constants } = require('./constants')
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
      requests,
      status
    }
  } = body

  const [request] = requests

  const {
    requestedFor: { displayName }
  } = request

  await sendBuildCompleteInfoToDiscord(name, status, displayName)

  res.send('Dorime')
})

app.post('/git-pullrequest-created', async (req, res) => {
  const { body } = req

  const { eventType } = body

  if (eventType !== eventTypes.GIT_PULLREQUEST_CREATED) {
    return res.status(422).send('Wrong event type')
  }

  const {
    resource: {
      createdBy: { displayName },
      description,
      _links: {
        web: { href }
      },
      repository: { name },
      sourceRefName,
      targetRefName,
      title
    }
  } = body

  const getSimpleBranchName = fullBranchName =>
    fullBranchName.split(constants.branchNamePrefix)

  const [, source] = getSimpleBranchName(sourceRefName)
  const [, target] = getSimpleBranchName(targetRefName)

  await sendGitPullRequestCreatedInfoToDiscord(
    source,
    target,
    name,
    displayName,
    title,
    description,
    href
  )

  res.send('Ameno')
})

app.post('/ms-vss-code-git-pullrequest-comment-event', async (req, res) => {
  const { body } = req

  const { eventType } = body

  if (eventType !== eventTypes.MS_VSS_CODE_GIT_PULLREQUEST_COMMENT_EVENT) {
    return res.status(422).send('Wrong event type')
  }

  const {
    message: { html },
    resource: {
      comment: {
        author: { displayName },
        content
      },
      pullRequest: { pullRequestId }
    }
  } = body

  const [, url] = html.split('"')

  await sendMsVssCodeGitPullRequestCommentEventInfoToDiscord(
    displayName,
    pullRequestId,
    content,
    url
  )

  res.send('Ameno')
})

app.listen(port, () => {
  console.info(`App listening on port ${port}`)
})
