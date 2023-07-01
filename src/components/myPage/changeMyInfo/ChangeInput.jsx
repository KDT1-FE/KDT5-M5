import React, { useEffect, useState } from 'react'
import { userInfo } from '../../../store/UserAPI'

import userImg from '../../../img/user.png'
import styled from 'styled-components'

const ChangeInput = () => {
  const [userData, setUserData] = useState('')
  const [newUserData, setNewUserData] = useState('')
  const [profileImg, setProfileImg] = useState('')

  function uploadImg(event) {
    const files = event.target.files
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', e => {
        setNewUserData({ profileImgBase64: e.target.result })
        setProfileImg(e.target.result)
      })
    }
  }

  const getUserInfo = async () => {
    const res = await userInfo({})
    setUserData(res)
    setProfileImg(res.profileImg)
  }

  const changeUserInfo = async e => {
    e.preventDefault()
    console.log(newUserData)

    if (newUserData.newPassword) {
      if (!newUserData.oldPassword) {
        alert('현재 비밀번호를 입력해주세요')
        return
      }
    }
    if (newUserData.oldPassword) {
      if (!newUserData.newPassword) {
        alert('새로운 비밀번호를 입력해주세요')
        return
      }
    }
    const res = await userInfo(newUserData)

    if (!res.displayName) {
      alert(res)
    } else {
      alert('변경 완료')
    }
    setUserData(res)
    setNewUserData('')
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <Wrapper>
      <h2>기본 정보 수정</h2>

      <div className="sub-wrapper">
        <InfoWrapper>
          <p>이름</p>
          <DataWrapper>
            <div>{userData.displayName}</div>

            <div>
              <input
                type="text"
                placeholder="이름"
                value={`${
                  newUserData.displayName ? newUserData.displayName : ''
                }`}
                onChange={e => {
                  setNewUserData({ displayName: e.target.value })
                }}
              />
              <button
                type="button"
                onClick={changeUserInfo}>
                변경
              </button>
            </div>
          </DataWrapper>
        </InfoWrapper>

        <InfoWrapper>
          <p>프로필</p>
          <DataWrapper>
            <img
              // src={`${userData.profileImg ? userData.profileImg : userImg}`}
              src={`${profileImg ? profileImg : userImg}`}
              alt="profileImg"
            />
            <div>
              <input
                type="file"
                onChange={e => {
                  uploadImg(e)
                }}
              />

              <button
                type="button"
                onClick={changeUserInfo}>
                변경
              </button>
            </div>
          </DataWrapper>
        </InfoWrapper>

        <InfoWrapper>
          <p>비밀번호</p>

          <DataWrapper>
            <div>
              <input
                type="password"
                placeholder="현재 비밀번호"
                value={`${
                  newUserData.oldPassword ? newUserData.oldPassword : ''
                }`}
                onChange={e => {
                  setNewUserData({
                    newPassword: newUserData.newPassword,
                    oldPassword: e.target.value
                  })
                }}
              />
              <br />
              <input
                type="password"
                placeholder="새로운 비밀번호"
                value={`${
                  newUserData.newPassword ? newUserData.newPassword : ''
                }`}
                onChange={e => {
                  setNewUserData({
                    oldPassword: newUserData.oldPassword,
                    newPassword: e.target.value
                  })
                }}
              />

              <button
                type="button"
                onClick={changeUserInfo}>
                변경
              </button>
            </div>
          </DataWrapper>
        </InfoWrapper>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: calc(100vh - 350px);
  h2 {
    font-size: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .sub-wrapper {
    border-top: 2px solid #696969;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid #c7c7c7;

  p {
    background-color: #edffed;
    min-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 80px;
    border-right: 1px solid #c7c7c7;

    color: #707070;
    font-weight: bold;
  }
  img {
    width: 50px;
    height: 50px;
    display: inline-block;
  }
`

const DataWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 20px;

  input {
    margin: 10px;
    border: none;
    border-bottom: 1px solid #a5a5a5;
    height: 30px;
  }
`

export default ChangeInput
