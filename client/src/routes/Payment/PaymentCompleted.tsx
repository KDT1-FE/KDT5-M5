import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const PaymentCompleted = () => {
  const navigate = useNavigate()

  const navigateToMain = () => {
    navigate('/')
  }

  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, '', location.href)
      console.log('prevent go back!')
    }
    history.pushState(null, '', location.href)
    window.addEventListener('popstate', preventGoBack)
    return () => window.removeEventListener('popstate', preventGoBack)
  }, [])

  return (
    <Wrap>
      <p>결제가 완료되었습니다.</p>
      <Button onClick={navigateToMain}>메인 페이지로 돌아가기</Button>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding-top: 100px;
  p {
    font-size: 30px;
    color: #ffa9be;
  }
`

const Button = styled.button`
  width: 304px;
  height: 50px;
  background-color: #ffa9be;
  color: #fff;
  font-size: 18px;
  border-radius: 6px;
`
