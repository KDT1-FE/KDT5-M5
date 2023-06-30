import dotenv from 'dotenv'
import readline from 'readline'
import axios from 'axios'
dotenv.config()

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    apiKey: process.env.API_KEY,
    username: process.env.USERNAME,
    masterKey: process.env.MASTER_KEY,
  },
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function init() {
  console.log('Enter a product id : ')
  rl.on('line', async (id: string) => {
    const res = await api({
      method: 'GET',
      url: `/api/products/${id}`,
    })
    const products = res.data
    console.log(products)
    rl.close()
  })
  rl.on('close', () => {
    process.exit(0)
  })
}

init()
