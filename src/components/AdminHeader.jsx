import React from 'react'
import styled from 'styled-components'

const AdminHeader = () => {
  return (
    <NavWrapper>
      <a href="/admin">Admin</a>
      <a href="/admin/user">유저리스트</a>
      <a href="/admin/productAdd">제품 추가</a>
      <a href="/admin/products">제품 관리</a>
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
  padding: 0 36px;
  z-index: 3;

  a {
    color: #fff;
    margin-right: 20px;
  }
`
