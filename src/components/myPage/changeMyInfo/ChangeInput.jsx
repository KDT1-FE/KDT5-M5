import React, { useEffect, useState } from 'react'
import { userInfo } from '../../../store/UserAPI'
import './changeInput.css'

import userImg from '../../../img/user.png'

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
    <div className="change-info">
      <h1>회원정보 수정</h1>
      <p>회원님의 소중한 정보를 안전하게 관리하세요</p>
      <h2>기본정보</h2>

      <div className="info">
        <div className="info-input">
          <div className="info-menu">이름</div>
          <div className="info-data">
            {userData.displayName}

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
        </div>

        <div className="info-input">
          <div className="info-menu">프로필</div>
          <div className="info-data">
            <img
              // src={`${userData.profileImg ? userData.profileImg : userImg}`}
              src={`${profileImg ? profileImg : userImg}`}
              alt="profileImg"
            />
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
        </div>

        <div className="info-input">
          <div className="info-menu">비밀번호</div>
          <div className="info-data">
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
        </div>
      </div>
    </div>
  )
}

export default ChangeInput
