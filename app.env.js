const { config } = require('dotenv')

config()

const envs = {
  AVATAR_URL: process.env.AVATAR_URL,
  DISCORD_URL: process.env.DISCORD_URL,
  PORT: process.env.PORT,
  USERNAME: process.env.USERNAME
}

module.exports = { envs }
