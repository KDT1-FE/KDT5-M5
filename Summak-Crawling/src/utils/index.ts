import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

export function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function convertSrcToBase64(src: string) {
  try {
    const response = await axios.get(src, {
      responseType: 'arraybuffer',
    })
    const buffer = Buffer.from(response.data, 'binary').toString('base64')
    return buffer
  } catch (error) {
    console.error(error)
    return ''
  }
}
