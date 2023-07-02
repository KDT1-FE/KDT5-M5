import { PageHeader } from '../../components/mypage/PageHeader'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../apis/api'
import GlobalStyle from '../../styles/GlobalStyles'
import styled from 'styled-components'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`

const Contents = styled.div`
  margin-top: 166px;
  text-align: center;
  > h2 {
    font-family: 'Noto Sans KR';
    letter-spacing: -.05em;
    font-size: 30px;
    color: #ffa9be;
    margin-bottom: 178px;
  }
  > form {
    > button {
      background-color: #dedede;
      color: #fff;
      width: 120px;
      height: 60px;
      border-radius: 6px;
      font-family: 'Noto Sans KR';
      font-size: 20px;
      transition: .3s;
      &:hover {
        background-color: #ffa9be;
      }
    }
  }
`
export const UserLogout = () => {
  // navigate
  const navigate = useNavigate()

  const [isLoggeIn, setisLoggedIn] = useState(true);

  const handleSignOut = async () => {
    try {
      // 로그아웃 성공 시 상태 업데이트
      setisLoggedIn(false);

      const response = await signOut(); // headers는 내부적으로 처리되므로 별도로 전달하지 않아도 됩니다.

      localStorage.setItem('token', response.accessToken)
      console.log('로그아웃 성공')
    } catch (error) {
      console.log('로그아웃에 실패했습니다.')
    }

    navigate('/')
  }

  return (
    <Wrap>
      <GlobalStyle />
      <PageHeader title="로그아웃" />
      <Contents>
        <h2>로그아웃 하시겠습니까?</h2>
        {isLoggeIn ? (
          <form onClick={handleSignOut}>
            <button type='button'>예</button>
          </form>
        ) : (
          <p>이미 로그아웃 되었습니다.</p>
        )}
      </Contents>
    </Wrap>
  )
}