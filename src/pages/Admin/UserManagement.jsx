import React, { useEffect } from 'react'
import UserList from '../../components/userList/UserList'
import { loginCheck } from './check'

const UserManagement = () => {
  useEffect(() => {
    loginCheck()
  }, [])
  return <UserList />
}

export default UserManagement
