import React from 'react'
import userImg from '../../img/user.png'

const UserItem = ({ user }) => {
  return (
    <li key={user.email}>
      <img
        src={user.profileImg ? user.profileImg : userImg}
        alt="유저 프로필"
      />
      <div>
        <div>name : {user.displayName}</div>
        <div>email : {user.email}</div>
      </div>
    </li>
  )
}

export default UserItem
