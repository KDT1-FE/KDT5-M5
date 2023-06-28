import React from 'react'
import userImg from '../../img/user.png'
import styled from 'styled-components'

const UserItem = ({ user }) => {
  return (
    <LiWrapper key={user.email}>
      <img
        src={user.profileImg ? user.profileImg : userImg}
        alt="유저 프로필"
      />
      <div>
        <div>name : {user.displayName}</div>
        <div>email : {user.email}</div>
      </div>
    </LiWrapper>
  )
}

const LiWrapper = styled.li`
  width: 250px;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: rgb(97, 97, 97);
  margin: 5px;
  border-radius: 5px;

  img {
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 5px;
  }
`

export default UserItem
