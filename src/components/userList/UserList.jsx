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
      <div className="background">
        <h1>UserList</h1>
        <ul>{userList}</ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #5f5f5f;
  .background {
    background-color: #2e2e2e;
    margin: 0 auto;
    max-width: 1200px;
    padding-top: 70px;
    padding-bottom: 70px;
    color: #fff;
    min-height: calc(100vh - 140px);
  }

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export default UserList
