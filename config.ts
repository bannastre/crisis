import dotenv from 'dotenv'
dotenv.config()

const config = {
  name: process.env.NAME || 'crisis',
  basePath: process.env.BASE_PATH || '/crisis',
  env: process.env.ENV || 'test',
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || '3000',
  test: {
    url: `${process.env.HOST}:${process.env.PORT}` || 'http://localhost:3000',
  },
}

export default config
