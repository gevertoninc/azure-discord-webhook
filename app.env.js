const { config } = require('dotenv')

config()

const envs = {
  AVATAR_URL: process.env.AVATAR_URL,
  BUILD_COMPLETE_URL: process.env.BUILD_COMPLETE_URL,
  GIT_PULLREQUEST_CREATED_URL: process.env.GIT_PULLREQUEST_CREATED_URL,
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME
}

module.exports = { envs }
