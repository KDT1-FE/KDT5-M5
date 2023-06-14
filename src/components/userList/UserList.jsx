import React, { useEffect, useState } from 'react'
import userImg from '../../img/user.png'
import { getUserList } from '../../store/AdminAPI'
import './userList.css'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUserList().then(res => {
      setUsers(res)
    })
  }, [])

  console.log(users)

  const userList = users.map(user => {
    return (
      <li key={user.email}>
        <img
          src={userImg}
          alt="유저 프로필"
        />
        <div>
          <div>name : {user.displayName}</div>
          <div>email : {user.email}</div>
        </div>
      </li>
    )
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
