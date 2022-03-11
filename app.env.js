const { config } = require('dotenv')

config()

const envs = { PORT: process.env.PORT }

module.exports = { envs }
