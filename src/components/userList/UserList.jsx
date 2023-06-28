import React, { useEffect, useState } from 'react'
import { getUserList } from '../../store/AdminAPI'

import UserItem from './UserItem'
import styled from 'styled-components'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUserList().then(res => {
      setUsers(res)
    })
  }, [])

  const userList = users.map((user, index) => {
    return (
      <UserItem
        key={index}
        user={user}
      />
    )
  })

  return (
    <Wrapper>
      <h1>UserList</h1>
      <ul>{userList}</ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-top: 70px;

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export default UserList
