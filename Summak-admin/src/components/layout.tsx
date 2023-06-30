import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Menu } from 'antd'

import styles from './layout.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LOCAL_ID, LOCAL_PASSWORD, menuItems } from '../constants'
import LoginForm, { LoginFormProps } from './LoginForm'
import { authenticateAdmin } from '../apis/admin/login'

export default function Layout() {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()

  // * 로컬스토리지에 저정된 아이디, 패스워드로 관리자 인증합니다.
  useEffect(() => {
    const id = localStorage.getItem(LOCAL_ID)
    const password = localStorage.getItem(LOCAL_PASSWORD)

    if (id && password) {
      authenticateAdmin(id, password).then((res) => {
        setIsAdmin(res)
      })
    }
  }, [location.pathname, isAdmin, navigate])

  // * 관리자 로그인을 시도합니다. 성공시 로컬스토리지에 아이디, 비밀번호를 저장합니다.
  async function submitLoginForm(form: LoginFormProps) {
    const { data } = await axios({
      url: `/api/handler?id=${form.username}&password=${form.password}`,
      method: 'GET',
    })
    if (!data.isAdmin) {
      alert('관리자만 접근 가능합니다.')
    } else {
      alert('관리자 로그인에 성공하였습니다.')
      localStorage.setItem(LOCAL_ID, form.username)
      localStorage.setItem(LOCAL_PASSWORD, form.password)
    }
    setIsAdmin(data.isAdmin)
  }

  return (
    <div>
      <Menu mode='horizontal' items={menuItems} />
      <main className={styles.main}>
        {isAdmin ? <Outlet /> : <LoginForm onSubmit={submitLoginForm} />}
      </main>
    </div>
  )
}
