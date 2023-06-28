import React from 'react'
import styled from 'styled-components'
import { logOut } from '../store/UserAPI'

const AdminHeader = () => {
  const logout = async () => {
    const res = await logOut()
    if (res) {
      location.assign('/')
    }
  }
  return (
    <NavWrapper>
      <div>
        <a href="/admin">Admin</a>
        <a href="/admin/user">유저리스트</a>
        <a href="/admin/productAdd">제품 추가</a>
        <a href="/admin/products">제품 관리</a>
      </div>
      <p onClick={logout}>로그아웃</p>
    </NavWrapper>
  )
}

export default AdminHeader

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 36px;
  z-index: 3;

  a {
    color: #fff;
    margin-right: 20px;
  }
  p {
    color: #fff;
    margin-right: 20px;
  }
  p:hover {
    cursor: pointer;
  }
`
