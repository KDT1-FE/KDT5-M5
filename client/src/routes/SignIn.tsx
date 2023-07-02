import styled from 'styled-components'
import React, { useState, FormEvent, useEffect } from 'react'
import { signIn, authVerification } from '../apis/api'
import { useNavigate } from 'react-router-dom'
const { VITE_ADMIN_EMAIL } = (import.meta as any).env

const SignInBox = styled.div<{ isValidEmail: boolean }>`
  font-family: 'Noto Sans KR';
  text-align: center;
  margin-top: 100px;

  h1 {
    font-size: 26px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #191919;

    div {
      display: flex;
      align-items: center;
      width: auto;
      margin-top: 10px;
      margin-bottom: 50px;
      font-size: 20px;
      color: #8e8e8e;
      flex-direction: row;

      h2 {
        color: #ffa9be;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    padding: 10px;
    margin-top: 10px;
    width: 500px;
    height: 46px;
    border: 1px solid #8e8e8e;
    border-radius: 7px;
  }

  input:focus {
    border: 2px solid #ffa9be;
    outline: none;
  }

  button {
    margin-top: 30px;
    background-color: ${({ isValidEmail }) => (isValidEmail ? 'red' : '#DEDEDE')};
    padding: 20px;
    width: 500px;
    height: 60px;
    border-radius: 7px;
    font-size: 24px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const SignIn = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [displayName, setDisplayName] = useState<string>('')

  const validateEmail = (input: string) => {
    // 이메일 유효성 검사
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    return regex.test(input)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value
    setEmail(inputEmail)
    setIsValidEmail(validateEmail(inputEmail))
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await signIn(email, password)
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken)
        //if (email === process.env.VITE_ADMIN_EMAIL) {
        if (email === VITE_ADMIN_EMAIL) {
          alert('관리자 로그인에 성공하였습니다.')
          location.href = 'https://euphonious-florentine-b285d0.netlify.app/'
        } else {
          alert('로그인에 성공하였습니다.')
          setLoggedIn(true) // 값을 업데이트함
          setDisplayName(response.displayName) // 값을 업데이트함
          navigate('/')
          window.location.reload()
        }
        console.log()
      } else {
        alert('이메일이나 패스워드가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('로그인에 실패하였습니다.', error)
      alert('로그인에 실패하였습니다.')
    }
  }

  useEffect(() => {
    const verifyToken = async () => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        try {
          // 토큰 검증 및 사용자 정보 가져오기
          const response = await authVerification()
          console.log('인증 결과:', response) // 인증 결과 콘솔 출력
          if (response.accessToken) {
            setLoggedIn(true)
            setDisplayName(response.displayName)
          } else {
            setLoggedIn(false)
            setDisplayName('')
            localStorage.removeItem('accessToken')
          }
        } catch (error) {
          console.error('토큰 검증에 실패하였습니다.', error)
          setLoggedIn(false)
          setDisplayName('')
          localStorage.removeItem('accessToken')
        }
      }
    }

    verifyToken()
    console.log('loggedIn:', loggedIn)
    console.log('displayName:', displayName)
  }, [displayName, loggedIn])

  return (
    <SignInBox isValidEmail={isValidEmail}>
      <h1>
        로그인
        <div>
          <h2>뷰티인사이드</h2>의 다양한 서비스와 퍼스널 진단을 누리세요.
        </div>
      </h1>
      <form onSubmit={handleSignIn}>
        <input name="email" value={email} onChange={handleEmailChange} placeholder="이메일" />
        <input
          name="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button
          type="submit"
          style={{ backgroundColor: isValidEmail && password !== '' ? '#FFA9BE' : '#DEDEDE' }}
        >
          로그인
        </button>
      </form>
    </SignInBox>
  )
}

export default SignIn
