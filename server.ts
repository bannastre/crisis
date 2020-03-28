import { start } from './src/app'

const init = async () => {
  try {
    const server = await start()
  } catch (err) {
    console.error(err)
  }
}

init()
