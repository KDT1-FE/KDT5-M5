import { authenticate } from '../../store/UserAPI'
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

export const loginCheck = async () => {
  const res = await authenticate()
  if (!res.email) {
    location.assign('/login')
    alert('로그인 하십시오')
  } else if (res.email !== ADMIN_EMAIL) {
    alert('관리자가 아닙니다')
    location.assign('/')
  }
}
