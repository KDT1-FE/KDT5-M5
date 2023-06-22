import React, { useEffect, useState } from 'react'
import { authenticate } from '../../store/UserAPI'
import './myInfo.css'

const MyInfo = () => {
  const [user, setUser] = useState([])

  const getUser = async () => {
    const res = await authenticate()
    setUser(res.displayName)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="my-info">
      <h2>{user}님 반갑습니다</h2>
    </div>
  )
}

export default MyInfo
