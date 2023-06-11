import React, { useState } from 'react'
import './login.css'
import { logIn } from '../../store/UserAPI'
import { ADMIN_EMAIL } from '../../store/Base'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function userLogin(event) {
    event.preventDefault()
    const res = await logIn({ email: email, password: password })
    console.log(res.user)
    if (res.user) {
      if (res.user.email === ADMIN_EMAIL) {
        location.replace('/admin')
      } else {
        history.back()
      }
      // 로그인 성공시 이전화면으로
    } else {
      alert(`${res}`)
    }
  }

  return (
    <div className="login-background">
      <div className="login">
        <h2>로그인</h2>
        <p>로그인을 진행하세요.</p>

        <form onSubmit={userLogin}>
          <ul>
            <li>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </li>
            <li>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </li>
          </ul>

          <div className="login-button">
            <button type="submit">로그인</button>
            <button
              type="button"
              onClick={() => {
                location.replace('/sign')
              }}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
