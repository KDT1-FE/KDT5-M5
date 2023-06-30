import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net',
  headers: {
    'Content-Type': 'application/json',
    masterKey: 'true',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team6',
  },
})
