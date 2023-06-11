const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const USER_NAME = import.meta.env.VITE_USER_NAME
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

export const userHEADERS = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USER_NAME
}
export const adminHEADERS = {
  'content-type': 'application/json',
  apikey: API_KEY,
  username: USER_NAME,
  masterKey: 'true'
}

export const AUTH = `${BASE_URL}/auth`
export const PRODUCT = `${BASE_URL}/procuts`
export const ACCOUNT = `${BASE_URL}/account`
