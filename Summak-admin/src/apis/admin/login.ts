import axios from 'axios'

export const authenticateAdmin = async (username: string, password: string) => {
  try {
    const { data } = await axios({
      url: `/api/handler?id=${username}&password=${password}`,
      method: 'GET',
    })
    return data.isAdmin
  } catch (error) {
    console.error(error)
    return false
  }
}
