import React, { useState } from 'react'
import styles from './index.module.scss'
import { SignInRequest } from '@/types/auth'
import { signIn } from '@/apis/access/signIn'
import { useNavigate } from 'react-router-dom'
import { emailRegex, passwordRegex } from '@/utils/constants'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailMsg, setEmailMsg] = useState('')
  const [pwdMsg, setPwdMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (emailRegex.test(email) && passwordRegex.test(password)) {
      try {
        const data: SignInRequest = {
          email,
          password
        }
        await signIn(data)
        alert('비밀번호 변경페이지로 이동합니다.')
        navigate('/access/passwordchangeform')
      } catch (error) {
        console.error('로그인 실패:', error)
        setEmailMsg('입력값이 틀렸습니다. 다시 확인해주세요.')
        setPwdMsg('입력값이 틀렸습니다. 다시 확인해주세요.')
      }
    } else {
      setEmailMsg('입력값이 틀렸습니다. 다시 확인해주세요.')
      setPwdMsg('입력값이 틀렸습니다. 다시 확인해주세요.')
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles['subTitle']}>닌텐도 어카운트</h1>
      <div className={styles['passwordChange-group']}>
        <h1 className={styles['subTitle']}>비밀번호 재설정</h1>
        <form className={styles['passwordForm']} onSubmit={handleSubmit}>
          <div className={styles['inputForm']}>
            <input
              className={styles['input-text']}
              type="email"
              name="email"
              value={email}
              placeholder="메일 주소"
              onChange={(e) => setEmail(e.target.value)}
            />
            {
              <div className={emailMsg === '입력값이 틀렸습니다. 다시 확인해주세요.' ? styles.error : ''}>
                {emailMsg}
              </div>
            }
          </div>

          <div className={styles['inputForm']}>
            <input
              className={styles['input-text']}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="암호"
            />
            {<div className={pwdMsg === '입력값이 틀렸습니다. 다시 확인해주세요.' ? styles.error : ''}>{pwdMsg}</div>}
          </div>

          <div>
            <div className={styles['changeCheck-btn']}>
              <button
                type="submit"
                className={styles['submit-btn']}
                disabled={!emailRegex.test(email) || !passwordRegex.test(password)}
              >
                확인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
