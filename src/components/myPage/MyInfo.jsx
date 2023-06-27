import React, { useEffect, useState } from 'react'
import { authenticate } from '../../store/UserAPI'
import './myInfo.css'
import userImg from '../../img/user.png'

const MyInfo = () => {
  const [user, setUser] = useState([])

  const getUser = async () => {
    const res = await authenticate()
    setUser(res)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="my-info">
      <img
        src={user.profileImg ? user.profileImg : userImg}
        alt="프로필 사진"
      />
      <h2>{user.displayName}님 반갑습니다</h2>
    </div>
  )
}

export default MyInfo
