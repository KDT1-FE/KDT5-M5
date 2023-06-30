import dotenv from 'dotenv'
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

async function init() {
  await new Promise((res) => {
    console.log('Warnning : 10초뒤 실행 됩니다. 이 작업은 되돌릴 수 없습니다.')
    setTimeout(res, 10000)
  })

  // 모든 제품 검색
  const { data: products } = await api({
    method: 'POST',
    url: '/api/products/search',
  })

  // 모든제품 삭제
  for (let product of products) {
    await api({
      method: 'DELETE',
      url: `/api/products/${product.id}`,
    })
  }
}

init()
