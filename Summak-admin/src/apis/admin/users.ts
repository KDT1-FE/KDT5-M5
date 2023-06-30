import { api } from './index'

export const getUsers = async () => {
  try {
    const { data } = await api('/api/auth/users', {
      method: 'GET',
    })
    return data
  } catch (error) {
    console.error(error)
    return []
  }
}

export interface User {
  email: string // 사용자 아이디
  displayName: string // 사용자 표시 이름
  profileImg: string // 사용자 프로필 이미지 URL
}
