import React, { useState } from 'react'
import styled from 'styled-components'
import { signUp } from '../apis/api'
import { useNavigate } from 'react-router-dom'

const Section = styled.div`
  font-family: 'Noto Sans KR';
  margin-top: 152px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h1 {
    font-size: 26px;
    margin-bottom: 12px;
    font-weight: 500;
    letter-spacing: -0.05em;
  }
  > div {
    > p {
      font-size: 20px;
      text-align: center;
      margin-bottom: 58px;
      color: #8e8e8e;
      letter-spacing: -0.05em;
      > span {
        font-size: 20px;
        color: #ffa9be;
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    > input {
      width: 500px;
      height: 46px;
      border-radius: 6px;
      margin-bottom: 12px;
      padding: 10px;
      border: 1px solid #8e8e8e;
      &:focus {
        border: 2px solid #ffa9be;
        outline: none;
      }
    }
    > button {
      width: 500px;
      height: 60px;
      border-radius: 6px;
      font-size: 24px;
      color: #fff;
      background-color: #dedede;
      margin-top: 50px;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background-color: #ffa9be;
      }
    }
  }
`

function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await signUp(email, password, displayName)
      if (response.accessToken) {
        alert('회원가입에 성공하였습니다.')
        navigate('/SignIn')
      } else {
        alert('이미 가입된 회원입니다.')
      }
    } catch (error) {
      console.error('회원가입에 실패하였습니다.', error)
      alert('회원가입에 실패하였습니다.')
    }
  }

  return (
    <div>
      <Section>
        <h1>회원가입</h1>
        <div>
          <p>
            <span>뷰티인사이드</span>의 다양한 서비스와 퍼스널 진단을 누리세요.
          </p>
        </div>
        <form onSubmit={handleSignup}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="이름"
          />
          <button type="submit">회원가입</button>
        </form>
      </Section>
    </div>
  )
}

export default Signup
