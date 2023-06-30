import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()
console.log({
  baseURL: process.env.BASE_URL,
  headers: {
    apiKey: process.env.API_KEY,
    username: process.env.USER_NAME,
    masterKey: process.env.MASTER_KEY,
  },
})

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    apiKey: process.env.API_KEY,
    username: process.env.USER_NAME,
    masterKey: process.env.MASTER_KEY,
  },
})

async function init() {
  // 모든 제품 검색
  const res = await api({
    method: 'POST',
    url: '/api/products/search',
  })
  console.log(res.data)
}

init()
