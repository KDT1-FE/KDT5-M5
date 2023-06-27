import React, { useEffect, useState } from 'react'
import { getUserList } from '../../store/AdminAPI'
import './userList.css'
import UserItem from './UserItem'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUserList().then(res => {
      setUsers(res)
    })
  }, [])

  const userList = users.map(user => {
    return <UserItem user={user} />
  })

  return (
    <div className="Management">
      <h1>UserList</h1>
      <div className="userList">
        <ul>{userList}</ul>
      </div>
    </div>
  )
}

export default UserList
