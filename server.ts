import dotenv from 'dotenv'
dotenv.config()

import { start } from './src/app'

const init = async () => {
  const server = await start()
}
init()
