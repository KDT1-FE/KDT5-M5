import React from 'react'
import { authenticate, logOut } from '../../store/UserAPI'
import { useEffect } from 'react'

const loginCheck = async () => {
  const res = await authenticate()
  if (!res.email) {
    location.assign('/login')
  }
}

const logout = async () => {
  const res = await logOut()
  if (res) {
    location.assign('/')
  }
}

const MyPage = () => {
  useEffect(() => {
    loginCheck()
  }, [])
  // 마이페이지 index
  return (
    <>
      <button onClick={logout}>로그아웃</button>
    </>
  )
}

export default MyPage
