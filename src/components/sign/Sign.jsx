import React, { useState } from 'react'
import './sign.css'
import { signUp } from '../../store/UserAPI'

const Sign = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  async function userSignUp(event) {
    event.preventDefault()
    const res = await signUp({
      email: email,
      password: password,
      displayName: displayName
    })

    if (res.user) {
      location.replace('/login')
      alert(
        `${res.user.displayName} 님 가입이 완료되었습니다. 로그인을 진행해주세요.`
      )
    } else {
      alert(`${res}`)
    }
  }

  return (
    <div className="sign-background">
      <div className="sign">
        <h2>환영합니다!</h2>
        <p>회원가입을 진행하세요.</p>

        <form onSubmit={userSignUp}>
          <ul>
            <li>
              <input
                className="email-input"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </li>
            <li>
              <input
                className="password-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </li>
            <li>
              <input
                className="name-input"
                placeholder="Name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </li>
          </ul>

          <button type="submit">완료</button>
        </form>
      </div>
    </div>
  )
}

export default Sign
