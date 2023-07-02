import React from 'react'
import Admin from '../../components/Admin/index'
import { loginCheck } from './check'

const admin = () => {
  loginCheck()

  return <Admin />
}

export default admin
